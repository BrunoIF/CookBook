import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { initializeApollo } from 'lib/apolloClient';
import { GET_AUTH_TOKEN } from 'queries/authentication';

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const apolloClient = initializeApollo();

        const { username, password } = credentials;

        return apolloClient
          .mutate({
            mutation: GET_AUTH_TOKEN,
            variables: { username, password },
          })
          .then((result) => {
            if (result.data) {
              const { data } = result;
              console.log('data', data);
              const user = {
                ...data.tokenAuth.payload,
                name: data.tokenAuth.payload.username,
              };
              return Promise.resolve(user);
            } else {
              return Promise.resolve(null);
            }
          })
          .catch((err) => Promise.reject(err));
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
