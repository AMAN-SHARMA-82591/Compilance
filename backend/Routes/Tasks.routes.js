const express = require("express");
const auth = require("../middleware/auth.middleware");
const {
  taskList,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  progressOverviewData,
} = require("../controller/Task.controller");
const { checkOrganization } = require("../middleware/organization.middleware");
const { taskValidator } = require("../helper/taskValidator");

const router = express.Router();

router
  .route("/")
  .get(auth, checkOrganization, taskList)
  .post(auth, checkOrganization, taskValidator, createTask);
router
  .route("/progressOverview")
  .get(auth, checkOrganization, progressOverviewData);
router
  .route("/:id")
  .get(auth, checkOrganization, getTask)
  .delete(auth, checkOrganization, deleteTask)
  .patch(auth, checkOrganization, taskValidator, updateTask);

module.exports = router;
