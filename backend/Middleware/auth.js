const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    // Remove 'Bearer ' if it's included in the header
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET , (err) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }

        // Token is valid, proceed to the next middleware or route handler
        next();
    });
};

module.exports = verifyToken;
