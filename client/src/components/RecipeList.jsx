import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
    console.log('RecipeList received recipes:', recipes);

    if (!Array.isArray(recipes)) {
        console.error('Expected recipes to be an array, but got:', recipes);
        return null;
    }

    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipeList;