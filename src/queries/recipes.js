import { gql } from '@apollo/client';

export const GET_ALL_RECIPES = gql`
  query getRecipes {
    recipes {
      id
      title
      cookingTime
      image
      isSaved @client

      ingredients {
        id
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
      isSaved @client

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

export const UPDATE_RECIPE = gql`
  mutation updateRecipe($recipe: RecipeInput!) {
    updateRecipe(input: $recipe) {
      title
    }
  }
`;

export const GET_RECIPE_CREATED = gql`
  subscription getRecipeCreated {
    recipeCreated {
      id
      title
      cookingTime
      image
      ingredients {
        id
        name
      }
    }
  }
`;
