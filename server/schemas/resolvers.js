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

        // Resolver to fetch a user and their authored recipes
        userProfile: async (_, __, { user }) => {
            // throw error if no user
            if (!user) {
                throw new AuthenticationError('You must be logged in');
            }
            // Grab user by ID and their authored recipes
            const userProfile = await User.findById(user.id).populate('recipes');
            return userProfile;
        },

        // Resolver to fetch a recipe by its ID
        recipe: async (_, { id }) => {
            // Grab recipe by ID and get the author's username
            const recipe = await Recipe.findById(id).populate('author', 'username');
            // throw error if no recipe found
            if (!recipe) {
                throw new Error('Recipe not found');
            }
            return recipe;
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