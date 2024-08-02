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