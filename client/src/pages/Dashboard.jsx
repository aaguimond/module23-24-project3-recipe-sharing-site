import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_RECIPES } from '../graphql/queries';
import RecipeList from '../components/RecipeList';

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
            <RecipeList recipes={userRecipes} />
            {!allUserRecipesLoaded && (
                <button onClick={loadMore}>Load More</button>
            )}
        </div>
    );
};

export default Dashboard;