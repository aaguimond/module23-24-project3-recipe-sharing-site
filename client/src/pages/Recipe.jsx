import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPE_BY_ID } from '../graphql/queries';
import { useParams } from 'react-router-dom';

// Getting recipe by its ID
const Recipe = () => {
    // getting recipe ID from parameters
    const { id } = useParams();
    // using our query with the recipe's ID to grab it
    const { loading, error, data } = useQuery(GET_RECIPE_BY_ID, {
        variables: { id }
    });

    // returning loading and error messages if needed
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Grabbing recipe data from fetch and defining it as variables
    const { title, ingredients, instructions, author } = data.recipe;

    // returning html
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
        </div>
    );
};

export default Recipe;