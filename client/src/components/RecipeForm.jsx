import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_RECIPE } from '../graphql/mutations';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  const [createRecipe] = useMutation(CREATE_RECIPE);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createRecipe({
        variables: {
          title,
          ingredients,
          instructions,
          image,
        },
      });

      console.log('Recipe creation response:', data);

      setTitle('');
      setIngredients([{ name: '', quantity: '' }]);
      setInstructions('');
      setImage('');

    } catch (err) {
      console.error('Error creating recipe:', err);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {ingredients.map((ingredient, index) => (
        <div className="ingredient-input" key={index}>
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
      <button type="button" onClick={addIngredient}>Add Another Ingredient</button>
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default RecipeForm;