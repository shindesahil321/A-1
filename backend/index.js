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

// Export the app for serverless platforms (Vercel) or testing
module.exports = app;
