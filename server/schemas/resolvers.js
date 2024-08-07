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
        getRecipes: async (_, { limit = 10, offset = 0 }) => {
            try {
                const recipes = await Recipe.find()
                    .sort({ createdAt: -1 })
                    .skip(offset)
                    .limit(limit)
                    .populate('author', 'username');
        
                const totalCount = await Recipe.countDocuments();
        
                return { recipes, totalCount };
            } catch (err) {
                console.error('Error fetching recipes:', err);
                throw new Error('Error fetching recipes');
            }
        },        

        getUserRecipes: async (_, { limit = 10, offset = 0 }, context) => {
            console.log('Fetching user recipes with limit:', limit, 'and offset:', offset);
            //
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to do that');
            }

            try {
                const recipes = await Recipe.find({ author: context.user._id })
                    .sort({ createdAt: -1 })
                    .skip(offset)
                    .limit(limit)
                    .populate('author', 'username');

                const totalCount = await Recipe.countDocuments({ author: context.user._id });

                console.log('Fetched user recipes:', recipes);
                return { recipes, totalCount };
            } catch (err) {
                console.error('Error fetching user recipes:', err);
                throw new Error('Error fetching user recipes');
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
            console.log('User in context:', context.user);
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
                await recipe.populate('author');
                console.log('Recipe created:', recipe);
                return recipe;
            } catch (err) {
                console.error('Error creating recipe:', err);
                throw new Error('Error creating recipe');
            }
        },

        deleteRecipe: async (_, { id }, context) => {
            console.log('Delete recipe resolver called with ID:', id);
            if (!context.user) {
                console.log('User not authenticated');
                throw new AuthenticationError('You must be logged in to do that');
            }

            const recipe = await Recipe.findById(id);
            if (!recipe) {
                console.log('Recipe not found');
                throw new Error('Recipe not found');
            }

            console.log('Recipe found:', recipe);

            if (recipe.author.toString() !== context.user._id.toString()) {
                console.log('User not authorized to delete this recipe');
                throw new AuthenticationError('You are not authorized to delete this recipe');
            }

            await recipe.deleteOne();
            console.log('Recipe deleted:', recipe.id);
            return { id: recipe.id };
        }
    },
};

module.exports = resolvers;