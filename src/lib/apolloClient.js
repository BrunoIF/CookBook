import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_ENDPOINT = 'http://localhost:8090/graphql/';
const LOCAL_API_ENDPOINT = 'http://localhost:3000/api';

const getSessionToken = async () => {
  const result = await fetch(`${LOCAL_API_ENDPOINT}/session`);
  const token = await result.json();

  console.log('token', token.jwtToken);

  return token.jwtToken;
};

const getAuthorizationHeader = async () => ({
  Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJleHAiOjE2MDY5MzMyODIsIm9yaWdJYXQiOjE2MDY5MzE0ODJ9.572iTD2BWy4HpewdZ-oNk7UAaj4ocYdpBx2MHyR2ZsQ`,
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
