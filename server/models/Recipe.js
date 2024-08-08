const mongoose = require('mongoose');

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
    image: {
        type: String,
        default: 'https://i.imgur.com/frqvKRY.jpeg'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    timestamps: true,
});

recipeSchema.virtual('ingredientCount').get(function() {
    return this.ingredients.length;
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;