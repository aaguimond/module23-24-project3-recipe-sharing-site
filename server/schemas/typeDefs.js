const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
    }

    type Recipe {
        id: ID!
        title: String!
        ingredients: [Ingredient!]!
        instructions: String!
        author: User!
        image: String!
        createdAt: String!
    }

    input IngredientInput {
        name: String!
        quantity: String!
    }

    type Ingredient {
        name: String!
        quantity: String!
    }

    type RecipeWithCount {
        recipes: [Recipe]
        totalCount: Int
    }

    type Query {
        getRecipes(limit: Int, offset: Int): RecipeWithCount
        getUserRecipes(limit: Int, offset: Int): RecipeWithCount
        userProfile: User
        recipe(id: ID!): Recipe
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        createRecipe(title: String!, ingredients: [IngredientInput!]!, instructions: String!, image: String): Recipe
        updateRecipe(id: ID!, title: String!, ingredients: [IngredientInput!]!, instructions: String!, image: String): Recipe
        deleteRecipe(id: ID!): Recipe
    }
`;

module.exports = typeDefs;