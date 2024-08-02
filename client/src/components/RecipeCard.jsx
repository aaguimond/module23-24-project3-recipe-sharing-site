import React from 'react';

// Display a single recipe
const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <h2>{recipe.title}</h2>
            <p><strong>Author:</strong> {recipe.author.username}</p>
            <div>
                <strong>Ingredients:</strong>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.name}: {ingredient.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>Instructions:</strong>
                <p>{recipe.instructions}</p>
            </div>
        </div>
    );
};

export default RecipeCard;