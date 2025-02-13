require("dotenv").config();
const Task = require("../model/Task");

const taskList = async (req, res) => {
  const { uid, oid } = req;
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const filter = req.query.filter || "";
    const taskList = await Task.find({
      title: { $regex: search, $options: "i" },
      rootUserId: uid,
      orgId: oid,
    })
      .find({ type: { $regex: filter, $options: "i" } })
      .limit(limit);
    res.json({ pageInfo: {}, taskList, length: taskList.length });
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Error", error: error.message });
  }
};

const progressOverviewData = async (req, res) => {
  const { uid, oid } = req;
  const overdue = await Task.countDocuments({
    status: "overdue",
    rootUserId: uid,
    orgId: oid,
  });
  const upcomingCount = await Task.countDocuments({
    status: "upcoming",
    rootUserId: uid,
    orgId: oid,
  });
  const inProgressCount = await Task.countDocuments({
    status: "in-progress",
    rootUserId: uid,
    orgId: oid,
  });
  const totalCount = await Task.countDocuments({ rootUserId: uid });
  res.json({
    overdue: overdue,
    upcoming: upcomingCount,
    in_progress: inProgressCount,
    total: totalCount,
  });
};

const createTask = async (req, res) => {
  const { uid, oid } = req;
  try {
    const taskDetails = req.body;
    const newTask = await Task.create({
      orgId: oid,
      rootUserId: uid,
      ...taskDetails,
    });
    res.status(200).json(newTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getTask = async (req, res) => {
  const { uid } = req;
  try {
    const {
      params: { id },
    } = req;
    const taskData = await Task.findOne({
      _id: id,
      orgId: oid,
      rootUserId: uid,
    });
    res.status(200).json(taskData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteTask = async (req, res) => {
  const {
    params: { id: taskId },
    uid,
    oid,
  } = req;
  try {
    const taskData = await Task.findOne({
      _id: taskId,
      orgId: oid,
      rootUserId: uid,
    });
    if (!taskData) {
      res.status(404).json({ message: `Task not found with Id ${taskId}` });
    }
    await taskData.deleteOne();
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting Task: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  const {
    params: { id: taskId },
    uid,
  } = req;
  try {
    await Task.findOneAndUpdate(
      { taskId, rootUserId: uid, orgId: oid },
      req.body
    );
    res.status(200).json({ _id: taskId, ...req.body });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  taskList,
  getTask,
  deleteTask,
  updateTask,
  createTask,
  progressOverviewData,
};
