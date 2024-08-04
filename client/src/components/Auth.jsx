import React from 'react';
import { Navigate, Route } from 'react-router-dom';

// Higher-order component for protecting routes
const Auth = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={props =>
                token ? <Component {...props} /> : <Navigate to="/login" />
            }
        />
    );
};

export default Auth;
