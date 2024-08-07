import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from '../graphql/queries';

const Dashboard = () => {
    const [limit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [userRecipes, setUserRecipes] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { loading, error, data, fetchMore } = useQuery(GET_USER_RECIPES, {
        variables: { limit, offset },
        onCompleted: (data) => {
            if (data && data.getUserRecipes) {
                setUserRecipes(data.getUserRecipes.recipes);
                setTotalCount(data.getUserRecipes.totalCount);
                console.log('Initial user recipes loaded:', data);
            }
        }
    });

    const loadMore = () => {
        fetchMore({
            variables: { limit, offset: offset + limit },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setUserRecipes((prevRecipes) => [
                    ...prevRecipes,
                    ...fetchMoreResult.getUserRecipes.recipes
                ]);
                setOffset((prevOffset) => prevOffset + limit);
                console.log('More user recipes loaded:', fetchMoreResult);
                return {
                    getUserRecipes: {
                        recipes: [...prev.getUserRecipes.recipes, ...fetchMoreResult.getUserRecipes.recipes],
                        totalCount: fetchMoreResult.getUserRecipes.totalCount
                    }
                };
            },
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log('User recipes state:', userRecipes);

    const allUserRecipesLoaded = userRecipes.length >= totalCount;

    return (
        <div>
            <h1>Your Recipes</h1>
            <ul>
                {userRecipes.map((recipe) => (
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
            {!allUserRecipesLoaded && (
                <button onClick={loadMore}>Load More</button>
            )}
        </div>
    );
};

export default Dashboard;