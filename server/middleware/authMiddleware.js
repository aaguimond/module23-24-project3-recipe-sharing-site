const jwt = require('jsonwebtoken');
const User = require('../models/User');

// add next to move on to other functions after authorization completes
const authMiddleware = async (req, res, next) => {
    // grabbing the auth header and storing it in a variable
    const authHeader = req.headers.authorization;

    // check if authorization header exists and is formatted correctly
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // if not, return error message
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    } 

    // taking the token from the auth header: splitting it at the space and taking the value after the space
    const token = authHeader.split(' ')[1];

    try {
        // verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // excluding password and email from returned user data
        const user = await User.findById(decoded.userId).select('-password -email');

        // if user doesn't exist, return an error
        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }

        // attach user to req object
        req.user = user;

        // call next process
        next();

    // catching errors
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;