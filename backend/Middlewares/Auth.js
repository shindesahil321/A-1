// Middleware: Verify JWT token from Authorization header and attach user to request
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authToken = req.headers['authorization'];
    
    // Check if token is present
    if (!authToken) {
        return res.status(403).json({ 
            message: 'Unauthorized: JWT token is required' 
        });
    }
    
    try {
        // Verify token signature and expiration
        const decodedUser = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (err) {
        return res.status(403).json({ 
            message: 'Unauthorized: JWT token is invalid or expired' 
        });
    }
};

module.exports = ensureAuthenticated;