const mongoose = require('mongoose');

// Support multiple env var names for flexibility (Render/other hosts may use MONGO_URI)
const mongo_url = process.env.MONGO_CONN || process.env.MONGO_URI;

if (!mongo_url) {
    console.error('MongoDB connection string is not set. Please set MONGO_CONN or MONGO_URI in environment variables.');
} else {
    mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB Connected...');
        }).catch((err) => {
            console.error('MongoDB Connection Error: ', err && err.message ? err.message : err);
        });
}

// Optional: export mongoose connection for tests
module.exports = mongoose;