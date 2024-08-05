import React from 'react';
import { Navigate, Route } from 'react-router-dom';

// Higher-order component for protecting routes
const Auth = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default Auth;
