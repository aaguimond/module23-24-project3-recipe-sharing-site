import React from 'react';
import RecipeForm from '../components/RecipeForm';
import './AddRecipe.css';

const AddRecipe = () => {
    return (
        <div>
            <h1>Add a new recipe</h1>
            <RecipeForm />
        </div>
    );
};

export default AddRecipe;