const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: [true, 'Name Field is required'],
        minLength: 2,
    },
    description: {
        type: 'String',
        required: [true, 'Description Field is required'],
        minLength: 2,
    },
    status: {
        type: 'String',
        required: [true, 'Status Field is required'],
    },
    progress: {
        type: 'Number',
        
    }
})