import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';

const Header = () => {
    // Get the token from local storage
    const token = isLoggedIn();

    // handle logout
    const handleLogout = () => {
        // removing token from storage and reloading page upon logout
        logout();
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
