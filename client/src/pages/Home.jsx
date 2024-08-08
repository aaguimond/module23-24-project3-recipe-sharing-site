import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../graphql/queries';
import './Home.css';
import loadingGif from '../../src/assets/loading.gif';

const Home = () => {
    const [limit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [recipes, setRecipes] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { loading, error, data, fetchMore, refetch } = useQuery(GET_RECIPES, {
        variables: { limit, offset },
        onCompleted: (data) => {
            if (data && data.getRecipes) {
                setRecipes(data.getRecipes.recipes);
                setTotalCount(data.getRecipes.totalCount);
                console.log('Initial data loaded:', data);
            }
        }
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const loadMore = () => {
        fetchMore({
            variables: { limit, offset: offset + limit },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setRecipes((prevRecipes) => [
                    ...prevRecipes,
                    ...fetchMoreResult.getRecipes.recipes
                ]);
                setOffset((prevOffset) => prevOffset + limit);
                console.log('More data loaded:', fetchMoreResult);
                return {
                    getRecipes: {
                        recipes: [...prev.getRecipes.recipes, ...fetchMoreResult.getRecipes.recipes],
                        totalCount: fetchMoreResult.getRecipes.totalCount
                    }
                };
            },
        });
    };

    const loadPrevious = () => {
        const newOffset = offset - limit;
        fetchMore({
            variables: { limit, offset: newOffset },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setRecipes(fetchMoreResult.getRecipes.recipes);
                setOffset(newOffset);
                console.log('Previous data loaded:', fetchMoreResult);
                return fetchMoreResult;
            },
        });
    };

    if (loading) return <img src={loadingGif} alt="Loading..." className="loading-gif" />;
    if (error) return <p>Error: {error.message}</p>;

    console.log('Recipes state:', recipes);

    const allRecipesLoaded = recipes.length + offset >= totalCount;
    const hasPreviousRecipes = offset > 0;

    return (
        <div className="container">
            <RecipeList recipes={recipes} />
            <div className="pagination-buttons">
                {hasPreviousRecipes && (
                    <button onClick={loadPrevious}>Previous Page</button>
                )}
                {!allRecipesLoaded && (
                    <button onClick={loadMore}>Load More</button>
                )}
            </div>
        </div>
    );
};

export default Home;