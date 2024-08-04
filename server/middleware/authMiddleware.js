const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (token) => {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token.replace('Bearer', ''), process.env.JWT_SECRET);
        return User.findById(decoded.userId).select('-password -email');
    } catch (err) {
        console.error(err);
        return null;
    }
};

module.exports = authMiddleware;