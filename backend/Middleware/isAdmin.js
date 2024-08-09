const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isAdmin = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required.' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Failed to authenticate token.' });
    }
};

module.exports = isAdmin;
