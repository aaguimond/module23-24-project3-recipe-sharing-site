import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Higher-order component for protecting routes
const Auth = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={props =>
                token ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default Auth;
