const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (token) => {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password -email');
        console.log('User from token:', user);
        return user;
    } catch (err) {
        console.error('Authentication error:', err);
        return null;
    }
};

module.exports = authMiddleware;