import { gql } from '@apollo/client';

// Define the GraphQL mutation for creating a new recipe
const CREATE_RECIPE = gql`
  mutation CreateRecipe($title: String!, $ingredients: [IngredientInput!]!, $instructions: String!) {
    createRecipe(title: $title, ingredients: $ingredients, instructions: $instructions) {
      id
      title
      author {
        username
      }
    }
  }
`;

// mutation for registration
export const REGISTER_USER = gql`

`

// mutation for login
export const LOGIN_USER = gql`

`