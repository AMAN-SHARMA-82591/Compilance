const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: [true, 'Name field is required'],
        minLength: 3,
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        RegExp: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Provide a valid email!',
        ],
        unique: true,
    },
    image: {
        type: String,
        unique: false,
    },
    company: {
        type: String,
    },
    phone_number: {
        type: Number,
    },
    department: {
        type: String,
    },
    designation: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
    },
    oid: {
        type: String,
    },
    admin: {
        type: Boolean,
    },
    skills: {
        type: [String],
    },
    bio: {
        type: String,
    }
});

module.exports = Profile = mongoose.model('profile', profileSchema);