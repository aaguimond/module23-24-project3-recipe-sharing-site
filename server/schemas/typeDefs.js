const { gql } = require('apollo-server-express');

// Defining the GraphQL schema
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
    }

    input IngredientInput {
        name: String!
        quantity: String!
    }

    type Ingredient {
        name: String!
        quantity: String!
    }

    type Query {
        getRecipes: [Recipe]
        userProfile: User
        recipe(id: ID!): Recipe
    }

    type Mutation {
        register(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        createRecipe(title: String!, ingredients: [IngredientInput!]!, instructions: String!): Recipe
    }
`;

module.exports = typeDefs;