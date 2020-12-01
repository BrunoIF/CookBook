import { gql } from '@apollo/client';

export const CREATE_INGREDIENT = gql`
  mutation createIngredient($ingredient: CreateIngredientMutationInput!) {
    createIngredient(input: $ingredient) {
      name
    }
  }
`;

export const GET_INGREDIENTS = gql`
  query getIngredients {
    id
    name
  }
`;
