import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_ENDPOINT = 'http://localhost:8090/graphql/';

export const getSessionToken = () => {
  const authInfo = JSON.parse(localStorage.getItem('cookbook_auth'));
  return authInfo?.token;
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

export default new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  link: finalLink,
  cache,
});

export async function getStandaloneApolloClient() {
  const { ApolloClient, InMemoryCache, HttpLink } = await import(
    '@apollo/client'
  );
  return new ApolloClient({
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });
}
