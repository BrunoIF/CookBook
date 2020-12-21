import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { google } from 'googleapis';

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
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&response_type=code&access_type=offline',
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read',
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      console.log('user', user);
      console.log('account', account);
      console.log('profile', profile);

      const { provider, accessToken } = account;
      if (provider === 'google') {
        const people = google.people({
          version: 'v1',
          auth: process.env.GOOGLE_API_KEY,
          headers: { authorization: `Bearer ${accessToken}` },
        });
        people.people
          .get({
            resourceName: 'people/me',
            personFields: 'phoneNumbers,emailAddresses,genders',
          })
          .then((res) => console.log('res', res));
      }
      return Promise.resolve(true);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
