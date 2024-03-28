const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    status: {
        type: 'String',
        required: [true, 'Status field is required'],
    },
    title: {
        type: 'String',
        required: [true, 'Title field is required'],
    },
    description: {
        type: 'String',
        required: [true, 'Description field is required'],
    },
    type: {
        type: 'String',
        required: [true, 'Type field is required'],
    }
});

module.exports = mongoose.model('Task', TaskSchema);