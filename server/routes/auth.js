const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Route for registering a new user
router.post('/register', async (req, res) => {
    try {
        // take user details from request
        const { username, email, password } = req.body;
        // create new user from request details and store in variable
        const newUser = await User.create({ username, email, password });

        // create new token linked to the new user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // return token and user data if successful
        res.status(201).json({ token, user: newUser });
    
    // if not successful, display error
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user.' });
    }
});

// Route to log user in
router.post('/login', async (req, res) => {
    try {
        // grab email and password from req and store in variables
        const { email, password } = req.body;

        // find user from email in req
        const user = await User.findOne({ email });

        // if no user found, display error
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // grabbing method from user model to check if entered password matches the stored one
        const isMatch = await user.isCorrectPassword(password);

        // if passwords don't match, display error
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // create token linked to user
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // if successful, return token and user
        res.status(200).json({ token, user });

    // If unsuccessful, display error
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
})

module.exports = router;