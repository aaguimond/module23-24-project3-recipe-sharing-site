import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
    query GetRecipes($limit: Int, $offset: Int) {
        getRecipes(limit: $limit, offset: $offset) {
            recipes {
                id
                title
                image
                ingredients {
                    name
                    quantity
                }
                instructions
                author {
                    username
                }
                createdAt
            }
            totalCount
        }
    }
`;

export const GET_USER_RECIPES = gql`
    query GetUserRecipes($limit: Int, $offset: Int) {
        getUserRecipes(limit: $limit, offset: $offset) {
            recipes {
                id
                title
                image
                ingredients {
                    name
                    quantity
                }
                instructions
                author {
                    username
                }
                createdAt
            }
            totalCount
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
            image
            ingredients {
                name
                quantity
            }
            instructions
            author {
                id
                username
            }
            createdAt
        }
    }
`;