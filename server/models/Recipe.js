const mongoose = require('mongoose');

// Defining recipe schema attributes
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true,
            },
            // have quantity as a string to allow units of measurement to be added
            quantity: {
                type: String,
                required: true,
            }
        }
    ],
    instructions: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    // allow virtuals and getters
    toJSON: {
        virtuals: true,
        getters: true,
    },
    // Add timestamps to posted recipes
    timestamps: true,
});

// creating a virtual to count how many ingredients are in the recipe
recipeSchema.virtual('ingredientCount').get(function() {
    return this.ingredients.length;
});

// Defining recipe model from recipe schema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;