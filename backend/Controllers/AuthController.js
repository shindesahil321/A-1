const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if email already registered
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'Email already registered. Please log in or use a different email.',
                success: false 
            });
        }
        
        // Create new user and hash password before storing
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        
        res.status(201).json({
            message: 'Signup successful. Please log in.',
            success: true
        });
    } catch (err) {
        console.error('Signup error:', err && err.stack ? err.stack : err);
        const message = process.env.NODE_ENV === 'development' ? (err.message || 'Internal server error') : 'Internal server error';
        res.status(500).json({ message, success: false });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await UserModel.findOne({ email });
        const authFailureMsg = 'Invalid email or password.';
        
        if (!user) {
            return res.status(403).json({ 
                message: authFailureMsg,
                success: false 
            });
        }
        
        // Verify password matches stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ 
                message: authFailureMsg,
                success: false 
            });
        }
        
        // Generate JWT token (expires in 24 hours)
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful.',
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        console.error('Login error:', err && err.stack ? err.stack : err);
        const message = process.env.NODE_ENV === 'development' ? (err.message || 'Internal server error') : 'Internal server error';
        res.status(500).json({ message, success: false });
    }
}module.exports = {
    signup,
    login
}