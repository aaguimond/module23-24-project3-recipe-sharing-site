import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import Login from './components/Login';
import Register from './components/Register';
import Auth from './components/Auth';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';
import Dashboard from './pages/Dashboard'; // Import Dashboard component
import { isLoggedIn, logout } from './utils/auth';

const App = () => {
    const [authenticated, setAuthenticated] = useState(isLoggedIn());

    useEffect(() => {
        setAuthenticated(isLoggedIn());
    }, []);

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
    };

    return (
        <Router>
            <Header authenticated={authenticated} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
                <Route path="/register" element={<Register setAuthenticated={setAuthenticated} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/create-recipe" element={<Auth component={AddRecipe} />} />
                <Route path="/dashboard" element={<Auth component={Dashboard} />} /> {/* Add this line */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
