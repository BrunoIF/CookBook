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

export const REFRESH_TOKEN = gql`
  mutation refreshToken($token: String!) {
    refreshToken(token: $token) {
      token
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;
