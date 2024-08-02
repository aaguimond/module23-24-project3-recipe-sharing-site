// Importing Required Models
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { AuthenticationError } = require('apollo-server-express');

// Resolver functions for GraphQL schema
const resolvers = {
    Query: {
        // Resolver for fetching all recipes
        getRecipes: async () => {
            return await Recipe.find().populate('author')
        },
    },
    Mutation: {
        // Resolver for registering a new user
        register: async (_, { username, email, password }) => {
            const user = new User({ username, email, password });
            await user.save();
            const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
            return { id: user.id, username: user.username, email: user.email, token };
        },
        // Resolver for logging in a user
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new AuthenticationError('Invalid Credentials')
            }
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            return { id: user.id, username: user.username, email: user.email, token};
        },
        // Resolver for creating a new recipe
        createRecipe: async (_, { title, ingredients, instructions }, context) =>{
            if (!context.user) throw new AuthenticationError('You must be logged in');
            const recipe = new Recipe({
                title,
                ingredients,
                instructions,
                author: context.user.id,
            });
            await recipe.save();
            return recipe.populate('author').execPopulate();
        },
    },
};

module.exports = resolvers;