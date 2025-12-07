const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema: stores authenticated user credentials
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // enforce unique emails to prevent duplicate accounts
    },
    password: {
        type: String,
        required: true // stored as bcrypt hash, never plaintext
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;