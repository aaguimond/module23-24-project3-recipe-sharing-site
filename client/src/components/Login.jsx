import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';

const Login = ({ history }) => {
    // Defining our setEmail method
    const [email, setEmail] = useState('');

    // Defining our setPassword method
    const [password, setPassword] = useState('');

    // using our login mutation to log the user in
    const [login, { loading, error }] = useMutation(LOGIN_USER, {
        // once finished, give the user a token and redirect to the home page
        onCompleted: (data) => {
            localStorage.setItem('token', data.login.token);
            history.push('/');
        }
    });

    // Defining our handleSubmit function to pass the variables when the user submits the login form
    // to the login function
    const handleSubmit = async (e) => {
        // prevent the page reload
        e.preventDefault();

        // logging in the user with the variables from the form
        try {
            await login({ variables: { email, password } });

        // error catching
        } catch (err) {
            console.error(err);
        }
    };

    // Returning our login form with loading and error states
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Login;