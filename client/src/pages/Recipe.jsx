import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_RECIPE_BY_ID } from '../graphql/queries';
import { DELETE_RECIPE } from '../graphql/mutations';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import './Recipe.css';

const Recipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_RECIPE_BY_ID, {
        variables: { id }
    });

    const token = getToken();
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

    const [deleteRecipe] = useMutation(DELETE_RECIPE, {
        onCompleted: () => {
            console.log('Recipe deleted successfully');
            navigate('/');
        },
        onError: (error) => {
            console.error('Error deleting recipe:', error);
            alert('Error deleting recipe: ' + (error.message || 'Unknown error'));
        }
    });

    const handleDelete = async () => {
        try {
            console.log('Attempting to delete recipe with ID:', id);
            await deleteRecipe({ variables: { id } });
        } catch (err) {
            console.error('Error deleting recipe:', err);
            alert('Error deleting recipe: ' + (err.message || 'Unknown error'));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { title, ingredients, instructions, author } = data.recipe;

    return (
        <div>
            <h1>{title}</h1>
            <p><strong>Author:</strong> {author.username}</p>
            <div>
                <strong>Ingredients:</strong>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.name}: {ingredient.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>Instructions:</strong>
                <p>{instructions}</p>
            </div>
            {userId === author.id && (
                <>
                    <Link to={`/update-recipe/${id}`}>Update Recipe</Link>
                    <button onClick={handleDelete}>Delete Recipe</button>
                </>
            )}
        </div>
    );
};

export default Recipe;