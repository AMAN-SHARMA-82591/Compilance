const express = require('express');
const auth = require('../middleware/auth');
const { taskList, createTask, getTask, deleteTask, updateTask } = require('../controller/Task');

const router = express.Router();

router.route('/').get(auth, taskList).post(auth, createTask);
router.route('/:id').get(auth, getTask).delete(auth, deleteTask).patch(auth, updateTask)

module.exports = router;