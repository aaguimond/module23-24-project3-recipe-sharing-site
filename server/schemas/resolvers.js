// Importing Required Models
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { AuthenticationError } = require('apollo-server-express');

// Resolver functions for GraphQL schema
const resolvers = {
    Query: {
        // Resolver for fetching all recipes
        getRecipes: async () => {
            console.log('Fetching all recipes');
            try {
                const recipes = await Recipe.find().populate('author')
                console.log('Fetched recipes:', recipes);
                return recipes;
            } catch (err) {
                console.error('Error fetching recipes:', err);
                throw new Error('Error fetching recipes');
            }
            
        },

        // Resolver to fetch a user and their authored recipes
        userProfile: async (_, __, { user }) => {
            console.log('Fetching user profile');
            // throw error if no user
            if (!user) {
                throw new AuthenticationError('You must be logged in');
            }
            try {
                // Grab user by ID and their authored recipes
                const userProfile = await User.findById(user.id).populate('recipes');
                console.log('Fetched user profile:', userProfile);
                return userProfile;
            } catch (err) {
                console.error('Error fetching user profile:', err);
                throw new Error('Error fetching user profile');
            }
        },

        // Resolver to fetch a recipe by its ID
        recipe: async (_, { id }) => {
            console.log('Fetching recipe by ID:', id);
            try {
                // Grab recipe by ID and get the author's username
                const recipe = await Recipe.findById(id).populate('author', 'username');
                // throw error if no recipe found
                if (!recipe) {
                    console.error('Recipe by ID not found');
                    throw new Error('Recipe not found');
                }
                console.log('Fetched recipe by ID:', recipe);
                return recipe;
            } catch (err) {
                console.error('Error fetching recipe by ID:', err);
                throw new Error('Error fetching recipe by ID');
            }
        },
    },
    Mutation: {
        // Resolver for registering a new user
        register: async (_, { username, email, password }) => {
            console.log('Registering new user:', email);
            try {
                const user = new User({ username, email, password });
                await user.save();
                const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET);
                console.log('User registered:', user);
                return { id: user.id, username: user.username, email: user.email, token };
            } catch (err) {
                console.error('Error registering user:', err);
                throw new Error('Error registering user');
            }
        },

        // Resolver for logging in a user
        login: async (_, { email, password }) => {
            console.log('Logging in user:', email);
            try {
                const user = await User.findOne({ email });
                console.log(`User found: ${user}`);

                if (!user) {
                    console.error('Invalid credentials');
                    throw new AuthenticationError('Invalid Credentials');
                }

                const isMatch = await bcrypt.compare(password, user.password);
                console.log(`Comparing passwords: Entered - ${password}, Stored - ${user.password}, Match - ${isMatch}`);

                if (!isMatch) {
                    console.error('Invalid credentials');
                    throw new AuthenticationError('Invalid Credentials');
                }

                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
                console.log('User logged in:', user);
                return { id: user.id, username: user.username, email: user.email, token};
            } catch (err) {
                console.error('Error logging in user:', err);
                throw new Error('Error logging in user');
            }
        },

        // Resolver for creating a new recipe
        createRecipe: async (_, { title, ingredients, instructions }, context) =>{
            console.log('Creating new recipe:', title);
            if (!context.user) {
                console.error('User not logged in');
                throw new AuthenticationError('You must be logged in');
            }
            try {
                const recipe = new Recipe({
                    title,
                    ingredients,
                    instructions,
                    author: context.user.id,
                });
                await recipe.save();
                console.log('Recipe created:', recipe);
                return recipe.populate('author').execPopulate();
            } catch (err) {
                console.error('Error creating recipe:', err);
                throw new Error('Error creating recipe');
            }
        },
    },
};

module.exports = resolvers;