const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// will need to integrate later
const authMiddleware = require('../middleware/authMiddleware');

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

module.exports = router;