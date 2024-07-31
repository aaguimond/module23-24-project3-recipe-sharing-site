import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Define the GraphQL mutation for creating a new recipe
const CREATE_RECIPE = gql`
  mutation CreateRecipe($title: String!, $ingredients: [String!]!, $instructions: String!) {
    createRecipe(title: $title, ingredients: $ingredients, instructions: $instructions) {
      id
      title
      createdBy {
        username
      }
    }
  }
`;

const RecipeForm = () => {
  // Define state variables for the form inputs
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  // Create a mutation function using the defined GraphQL mutation
  const [createRecipe] = useMutation(CREATE_RECIPE);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Execute the mutation with the input values
    await createRecipe({
      variables: {
        title,
        ingredients: ingredients.split(','), // Split ingredients string into an array
        instructions,
      },
    });

    // Clear the form inputs after submission
    setTitle('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input for the recipe title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Input for the recipe ingredients */}
      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      {/* Textarea for the recipe instructions */}
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      ></textarea>

      {/* Submit button */}
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default RecipeForm;

