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
        ingredients: [String!]!
        instructions: String!
        createdBy: User!
    }
    
    type Query {
        getRecipes: [Recipe]
    }
    
    type Mutation {
        register(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): User
        createRecipe(title: String!, ingredients: [String!]!, instructions: String!) Recipe
    }
`;

module.exports = typeDefs;