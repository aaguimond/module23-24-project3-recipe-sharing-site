const express = require('express');
const { Recipe, User } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const { route } = require('./auth');

const router = express.Router();

// Route to create a new recipe
router.post('/recipes', authMiddleware, async (req, res) => {
    try {
        // take details from request
        const { title, ingredients, instructions } = req.body;
        // will need authMiddleware to verify user
        // store user in author variable
        const author = req.user._id;

        // creating new recipe by passing request details to the Recipe model
        const newRecipe = await Recipe.create({ title, ingredients, instructions, author });

        // returning new recipe if successful
        res.status(201).json(newRecipe);

    // displaying error if unsuccessful
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating the recipe.' });
    }
});

// Route to get all recipes
router.get('/recipes', async (req, res) => {
    try {
        // Get all recipes and grab the recipes' usernames to populate the author fields
        const recipes = await Recipe.find().populate('author', 'username');

        // send the recipes as the response if successful
        res.status(200).json(recipes);
    
    // if unsuccessful, send error
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving recipes.' });
    }
});

// Route to get one recipe by ID
router.get('/recipes/:recipeID', async (req, res) => {
    try {
        // Get recipe ID from req params
        const { recipeID } = req.params;

        // find recipe by ID and populate user as the author
        const recipe = await Recipe.findById(recipeID).populate('author', 'username');

        // if no recipe found with that ID, return error
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // send the recipe as the response if successful
        res.status(200).json(recipe);
    
    // if unsuccessful, send error
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving the recipe.' });
    }
});

// Route to get one recipe by ID
router.put('/recipes/:recipeID', authMiddleware, async (req, res) => {
    try {
        // Get recipe ID from req params
        const { recipeID } = req.params;

        // find recipe by ID
        const recipe = await Recipe.findById(recipeID)

        // if no recipe found with that ID, return error
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // if the user attempting to modify the recipe isn't the author, return error
        if (recipe.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this recipe.' });
        }

        // update the recipe with the new data from the request and save it
        Object.assign(recipe, req.body);
        await recipe.save();


        // send the updated recipe as the response if successful
        res.status(200).json(recipe);
    
    // if unsuccessful, send error
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating the recipe.' });
    }
});

// Route to delete one recipe by ID
router.delete('/recipes/:recipeID', authMiddleware, async (req, res) => {
    try {
        // Get recipe ID from req params
        const { recipeID } = req.params;

        // find recipe by ID
        const recipe = await Recipe.findById(recipeID);

        // if no recipe found with that ID, return error
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // if the user attempting to delete the recipe isn't the author, return error
        if (recipe.author.toString() !== req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to delete this recipe.' });
        }

        await recipe.remove();

        // send the recipe as the response if successful
        res.status(200).json({ message: 'Recipe deleted successfully' });
    
    // if unsuccessful, send error
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting the recipe.' });
    }
});

module.exports = router;