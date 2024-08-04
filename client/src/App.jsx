import React from 'react';
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

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/recipe/:id" component={Recipe} />
                <Route path="/create-recipe" 
                    element={
                        <Auth component={AddRecipe} />
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;