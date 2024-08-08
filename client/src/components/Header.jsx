import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/TheCharcuterieBoardBanner.png'
import './Header.css'

const Header = ({ authenticated, handleLogout }) => {
    return (
        <header>
            <div className="banner-container">
                <img src={bannerImage} alt="Banner" className="banner-image" />
                <nav>
                    {/* Link to the home page */}
                    <Link to="/">Home</Link>
                    {authenticated ? (
                        <>
                            {/* If the user is logged in, show the create recipe link and logout button */}
                            <Link to="/create-recipe">Create Recipe</Link>
                            <Link to="/dashboard">Dashboard</Link>
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
            </div>
        </header>
    );
};

export default Header;
