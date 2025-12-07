const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Global error handler to catch unexpected errors and log them
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err && err.stack ? err.stack : err);
    const message = process.env.NODE_ENV === 'development' ? (err.message || 'Internal server error') : 'Internal server error';
    res.status(500).json({ message, success: false });
});

// Serve static files from the React app build directory when present
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Only start listening when this file is run directly (not when required as a module by serverless platform)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });
}

// Log unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection at:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
});

// Export the app for serverless platforms (Vercel) or testing
module.exports = app;
