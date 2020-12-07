import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

export const GRAPHQL_ENDPOINT = 'http://localhost:8090/graphql/';

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

const finalLink = ApolloLink.from([authLink, httpLink]);

const cache = new InMemoryCache();

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    uri: GRAPHQL_ENDPOINT,
    link: finalLink,
    cache,
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
    console.log('pageProps', pageProps);
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
