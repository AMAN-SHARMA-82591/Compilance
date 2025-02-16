const express = require("express");
const auth = require("../middleware/auth");
const {
  taskList,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  progressOverviewData,
} = require("../controller/Task");
const organization = require("../middleware/organization");

const router = express.Router();

router
  .route("/")
  .get(auth, organization, taskList)
  .post(auth, organization, createTask);
router.route("/progressOverview").get(auth, organization, progressOverviewData);
router
  .route("/:id")
  .get(auth, organization, getTask)
  .delete(auth, organization, deleteTask)
  .patch(auth, organization, updateTask);

module.exports = router;
