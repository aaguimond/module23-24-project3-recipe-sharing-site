// server/schemas/resolvers.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
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

        userProfile: async (_, __, { user }) => {
            console.log('Fetching user profile');
            if (!user) {
                throw new AuthenticationError('You must be logged in');
            }
            try {
                const userProfile = await User.findById(user._id).populate({
                    path: 'recipes',
                    populate: {
                        path: 'author',
                        select: 'username email'
                    }
                });
                console.log('Fetched user profile:', userProfile);
                return userProfile;
            } catch (err) {
                console.error('Error fetching user profile:', err);
                throw new Error('Error fetching user profile');
            }
        },

        recipe: async (_, { id }) => {
            console.log('Fetching recipe by ID:', id);
            try {
                const recipe = await Recipe.findById(id).populate('author', 'username');
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
        register: async (_, { username, email, password }) => {
            console.log('Registering new user:', email);
            try {
                const user = new User({ username, email, password });
                await user.save();
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
                console.log('User registered:', user);
                return { id: user.id, username: user.username, email: user.email, token };
            } catch (err) {
                console.error('Error registering user:', err);
                throw new Error('Error registering user');
            }
        },

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
                return { id: user.id, username: user.username, email: user.email, token };
            } catch (err) {
                console.error('Error logging in user:', err);
                throw new Error('Error logging in user');
            }
        },

        createRecipe: async (_, { title, ingredients, instructions, image }, context) => {
            console.log('Creating new recipe:', title);
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }
            try {
                const recipe = new Recipe({
                    title,
                    ingredients,
                    instructions,
                    image: image || 'https://i.imgur.com/frqvKRY.jpeg',
                    author: context.user._id,
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

        updateRecipe: async (_, { id, title, ingredients, instructions, image }, context) => {
            console.log('Updating recipe:', id);
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }
            try {
                const recipe = await Recipe.findById(id);
                if (!recipe) {
                    throw new Error('Recipe not found');
                }
                if (recipe.author.toString() !== context.user._id.toString()) {
                    throw new AuthenticationError('You are not authorized to update this recipe');
                }
                recipe.title = title;
                recipe.ingredients = ingredients;
                recipe.instructions = instructions;
                recipe.image = image || recipe.image;
                await recipe.save();
                await recipe.populate('author');
                console.log('Recipe updated:', recipe);
                return recipe;
            } catch (err) {
                console.error('Error updating recipe:', err);
                throw new Error('Error updating recipe');
            }
        },

        deleteRecipe: async (_, { id }, context) => {
            console.log('Deleting recipe:', id);
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }
            try {
                const recipe = await Recipe.findById(id);
                if (!recipe) {
                    throw new Error('Recipe not found');
                }
                if (recipe.author.toString() !== context.user._id) {
                    throw new AuthenticationError('You are not authorized to delete this recipe');
                }
                await recipe.deleteOne();
                console.log('Recipe deleted:', recipe);
                return recipe;
            } catch (err) {
                console.error('Error deleting recipe:', err);
                throw new Error('Error deleting recipe');
            }
        }
    }
};

module.exports = resolvers;