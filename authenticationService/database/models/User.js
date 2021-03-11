const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: true
        },
        userCredentials_id: {
            type: ObjectId,
            required: true
        }
    },
    { collection: 'users' }
);

const User = mongoose.model('users', UserSchema);

module.exports = User;