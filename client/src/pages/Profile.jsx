import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../graphql/queries';
import './Profile.css'
import loadingGif from '../../src/assets/loading.gif';

// Render a user's profile
const Profile = () => {
    // Using our query to get their profile from db
    const { loading, error, data } = useQuery(GET_USER_PROFILE);

    // Displaying loading and error messages if needed
    if (loading) return <img src={loadingGif} alt="Loading..." className="loading-gif" />;
    if (error) return <p>Error: {error.message}</p>

    // Grabbing username and recipes from fetched data
    const { username, recipes } = data.userProfile;

    // Returning html
    return (
        <div className="container">
            <h1>{username}'s Profile</h1>
            <h2>{username}'s Recipes</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p><strong>Ingredients:</strong></p>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.name}: {ingredient.quantity}
                                </li>
                            ))}
                        </ul>
                        <strong>Instructions:</strong>
                        <p>{recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;