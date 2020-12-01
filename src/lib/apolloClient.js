import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

export default new ApolloClient({
  uri: 'http://localhost:8090/graphql',
  cache,
  fetchOptions: {
    mode: 'no-cors',
  },
});
