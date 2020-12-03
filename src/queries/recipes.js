import { gql } from '@apollo/client';

export const GET_ALL_RECIPES = gql`
  query getRecipes {
    recipes {
      id
      title
      cookingTime
      image
      ingredients {
        name
      }
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation createRecipe($recipe: RecipeInput!) {
    createRecipe(input: $recipe) {
      title
    }
  }
`;

export const GET_RECIPE = gql`
  query getRecipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      cookingTime
      image
      ingredients {
        name
      }
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;
