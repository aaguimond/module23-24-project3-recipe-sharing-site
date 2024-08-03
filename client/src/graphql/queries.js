import { gql } from '@apollo/client';

// query to get all recipes
export const GET_RECIPES = gql`
    query GetRecipes {
        getRecipes {
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

// query to get a user's profile
export const GET_USER_PROFILE = gql`
    query GetUserProfile {
        userProfile {
            id
            username
            recipes {
                id
                title
                ingredients {
                    name
                    quantity
                }
                instructions
            }
        }
    }
`;

// query to get a single recipe by its ID
export const GET_RECIPE_BY_ID = gql`
    query GetRecipeById($id: ID!) {
        recipe(id: $id) {
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
            createdAt
            updatedAt
        }
    }
`;