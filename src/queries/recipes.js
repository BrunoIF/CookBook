import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
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
