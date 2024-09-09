const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    address: {
        type: String,
        required: [true, 'Address field is required'],
    },
    city: {
        type: String,
        required: [true, 'City field is required'],
    },
    state: {
        type: String,
        required: [true, 'State field is required'],
    },
    country: {
        type: String,
        required: [true, 'Country field is required'],
    },

});

module.exports = mongoose.model('Organization', organizationSchema);