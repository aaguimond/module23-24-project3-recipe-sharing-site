import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_RECIPE_BY_ID } from '../graphql/queries';
import { UPDATE_RECIPE } from '../graphql/mutations';
import { useParams, useNavigate } from 'react-router-dom';
import loadingGif from '../../src/assets/loading.gif';

const RecipeUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_RECIPE_BY_ID, {
    variables: { id },
  });

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  const [updateRecipe] = useMutation(UPDATE_RECIPE);

  useEffect(() => {
    if (data) {
      const { recipe } = data;
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instructions);
      setImage(recipe.image);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateRecipe({
        variables: {
          id,
          title,
          ingredients: ingredients.map(({ name, quantity }) => ({ name, quantity })),
          instructions,
          image,
        },
      });

      console.log('Recipe update response:', data);
      navigate(`/recipe/${id}`);
    } catch (err) {
      console.error('Error updating recipe:', err);
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

  if (loading) return <img src={loadingGif} alt="Loading..." className="loading-gif" />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
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
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default RecipeUpdateForm;