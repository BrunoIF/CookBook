import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import Cookies from 'js-cookie';
import ws from 'ws';

export const GRAPHQL_ENDPOINT = 'http://localhost:8090/graphql/';
export const WS_GRAPHQL_ENDPOINT = 'ws://localhost:8090/graphql/';

export const savedRecipesVar = makeVar([]);

export const saveRecipe = (id) => {
  savedRecipesVar([...savedRecipesVar(), id]);
  console.log('savedRecipesVar', savedRecipesVar());
};

export const getSessionToken = () => {
  const token = Cookies.get('token');
  return token;
};

const authLink = setContext((_, { headers }) => {
  const token = getSessionToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const subscriptionClient =
  typeof window !== 'undefined'
    ? new SubscriptionClient(WS_GRAPHQL_ENDPOINT, {
        reconnect: true,
        lazy: true,
        connectionParams: {
          headers: {
            authorization: `Bearer ${getSessionToken()}`,
          },
        },
        ws,
      })
    : null;

const wsLink =
  typeof window !== 'undefined' ? new WebSocketLink(subscriptionClient) : null;

const splitLink =
  typeof window !== 'undefined'
    ? ApolloLink.split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink,
      )
    : httpLink;

const finalLink = ApolloLink.from([authLink, splitLink]);

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

function createApolloClient() {
  const isServer = typeof window === 'undefined';

  return new ApolloClient({
    ssrMode: isServer,
    uri: GRAPHQL_ENDPOINT,
    link: finalLink,
    cache: isServer
      ? new InMemoryCache()
      : new InMemoryCache({
          typePolicies: {
            RecipeType: {
              fields: {
                isSaved: {
                  read(_, { variables, readField }) {
                    if (variables.id) {
                      return savedRecipesVar().includes(variables.id);
                    }

                    const id = readField('id');
                    return savedRecipesVar().includes(id);
                  },
                },
              },
            },
          },
        }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = { ...initialState, ...existingCache };

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
