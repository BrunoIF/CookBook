import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_ENDPOINT = 'http://localhost:8090/graphql/';

const getSessionToken = async () => {
  const authInfo = await localStorage.getItem('cookbook_auth');

  return authInfo.token;
};

const getAuthorizationHeader = async () => ({
  Authorization: `Bearer ${await getSessionToken()}`,
});

const getHeaders = async () => {
  const headers = await getAuthorizationHeader();

  return {
    headers: {
      ...headers,
      method: 'POST',
    },
  };
};

const authMiddleware = setContext(getHeaders);

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
});

const finalLink = ApolloLink.from([authMiddleware, httpLink]);

const cache = new InMemoryCache();

export default new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  link: finalLink,
  cache,
  fetchOptions: {
    mode: 'no-cors',
  },
});
