import { gql } from '@apollo/client';

export const GET_AUTH_TOKEN = gql`
  mutation authToken($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
    }
  }
`;
