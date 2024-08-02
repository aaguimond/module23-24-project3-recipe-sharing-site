import React from 'react';
import RecipeList from '../components/RecipeList';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../graphql/queries';

const Home = () => {
    // Using our get recipes query to get our recipes and providing different code for loading and error states
    const { loading, error, data } = useQuery(GET_RECIPES);

    // Need to import our loading GIF here later
    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>

    //
    return (
        <div>
            <h1>The Charcuterie Board</h1>
            <RecipeList recipes={data.getRecipes} />
        </div>
    );
};

export default Home;