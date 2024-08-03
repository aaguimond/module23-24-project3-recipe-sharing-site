import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RECIPE } from '../graphql/mutations';

const RecipeForm = () => {
  // Define state variables for the form inputs
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
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
        ingredients,
        instructions,
      },
    });

    // Clear the form inputs after submission
    setTitle('');
    setIngredients([{ name: '', quantity: '' }]);
    setInstructions('');
  };

  // handling change for ingredient inputs
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  // add a new ingredient input
  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
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
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
          />
        </div>
      ))}

      {/* Button to add a new ingredient input */}
      <button type="button" onClick={addIngredient}>Add Another Ingredient</button>

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