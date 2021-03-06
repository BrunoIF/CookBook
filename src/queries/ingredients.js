import { gql } from '@apollo/client';

export const CREATE_INGREDIENT = gql`
  mutation createIngredient($ingredient: IngredientInput!) {
    createIngredient(input: $ingredient) {
      name
    }
  }
`;

export const GET_INGREDIENTS = gql`
  query getIngredients {
    ingredients {
      name
      id
    }
  }
`;

export const GET_CREATED_INGREDIENT = gql`
  subscription getIngredients {
    ingredientCreated {
      name
      id
    }
  }
`;
