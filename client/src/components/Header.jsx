import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // handle logout
    const handleLogout = () => {
        // removing token from storage and reloading page upon logout
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <header>
            <nav>
                {/* Link to the home page */}
                <Link to="/">Home</Link>
                {token ? (
                    <>
                        {/* If the user is logged in, show the create recipe link and logout button */}
                        <Link to="/create-recipe">Create Recipe</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        {/* If the user is not logged in, show the login and register links */}
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
