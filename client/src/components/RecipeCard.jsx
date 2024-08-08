// src/components/RecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Display a single recipe
const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} />
            </Link>
        </div>
    );
};

export default RecipeCard;