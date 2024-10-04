const express = require('express');
const auth = require('../middleware/auth');
const { taskList, createTask, getTask, deleteTask, updateTask } = require('../controller/Task');
const organization = require('../middleware/organization');

const router = express.Router();

// router.route('/').get(auth, organization, taskList).post(auth, organization, createTask);
// router.route('/:id').get(auth, organization, getTask).delete(auth, organization, deleteTask).patch(auth, organization, updateTask)

router.route('/').get(auth, taskList).post(auth, createTask);
router.route('/:id').get(auth, getTask).delete(auth, deleteTask).patch(auth, updateTask)

module.exports = router;