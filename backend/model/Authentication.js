const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: [true, 'Name field is required'],
        minLength: 3,
    },
    email: {
        type: 'String',
        required: [true, 'Email is required'],
        RegExp: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Provide a valid email!',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
    role: {
        type: Number,
        default: 0  // 0 - user, 1 - admin, 2 - sub-admin - 5 - guest
    }
});

module.exports = mongoose.model('User', UserSchema);