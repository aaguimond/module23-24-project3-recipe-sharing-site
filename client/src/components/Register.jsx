import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Register = ({ setAuthenticated }) => {
    // Defining our setUsername method
    const [username, setUsername] = useState('');

    // Defining our setEmail method
    const [email, setEmail] = useState('');

    // Defining our setPassword method
    const [password, setPassword] = useState('');

    // using our register mutation to register the user
    const [register, { loading, error }] = useMutation(REGISTER_USER, {
        // once finished, give the user a token and redirect to the home page
        onCompleted: (data) => {
            saveToken(data.register.token);
            setAuthenticated(true);
            navigate('/')
        }
    });
    const navigate = useNavigate('/');

    // Defining our handleSubmit function to pass the variables when the user submits the register form
    // to the register function
    const handleSubmit = async (e) => {
        // prevent the page reload
        e.preventDefault();

        // registering the user with the variables from the form
        try {
            await register({ variables: { username, email, password } });

        // error catching
        } catch (err) {
            console.error(err);
        }
    };

    // Returning our register form with loading and error states
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                <button type="submit">Register</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default Register;