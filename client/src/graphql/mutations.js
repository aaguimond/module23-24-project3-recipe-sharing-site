import { gql } from '@apollo/client';

// Define the GraphQL mutation for creating a new recipe
export const CREATE_RECIPE = gql`
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

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: ID!, $title: String!, $ingredients: [IngredientInput!]!, $instructions: String!) {
    updateRecipe(id: $id, title: $title, ingredients: $ingredients, instructions: $instructions) {
      id
      title
      ingredients {
        name
        quantity
      }
      instructions
      author {
        username
      }
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

// mutation for registration
export const REGISTER_USER = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            id
            username
            email
            token
        }
    }
`;

// mutation for login
export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            username
            email
            token
        }
    }
`;