require("dotenv").config();
const Task = require("../model/Task.model");
const { validationResult } = require("express-validator");
// const { profile } = require("./User.controller");
const { default: mongoose } = require("mongoose");
// const { authAdminRole } = require("../utils/constants");

const taskList = async (req, res, next) => {
  const { oid } = req;
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const filter = req.query.filter || "";

    const query = {
      orgId: oid,
      title: { $regex: search, $options: "i" },
      type: { $regex: filter, $options: "i" },
    };
    const taskList = await Task.find(query)
      .skip(page * limit)
      .limit(limit)
      .lean();
    return res.status(200).json({
      success: true,
      message: "Fetched Task List",
      taskList,
      length: taskList.length,
    });
  } catch (error) {
    next(error);
  }
};

const progressOverviewData = async (req, res, next) => {
  const { uid, oid } = req;
  try {
    const query = { orgId: oid };
    const overdue = await Task.countDocuments({
      ...query,
      status: "overdue",
    });
    const upcomingCount = await Task.countDocuments({
      ...query,
      status: "upcoming",
    });
    const inProgressCount = await Task.countDocuments({
      ...query,
      status: "in-progress",
    });
    const totalCount = await Task.countDocuments(query);
    res.status(200).json({
      overdue: overdue,
      upcoming: upcomingCount,
      in_progress: inProgressCount,
      total: totalCount,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Errors",
      errors: errors.array(),
    });
  }
  const { uid, oid } = req;
  try {
    const orgId = req.body.orgId || oid;
    if (orgId && !mongoose.Types.ObjectId.isValid(orgId)) {
      return res.status(400).json({
        error: true,
        message: "Invalid Organization ID",
      });
    }

    // const organization = await Organization.findById(orgId)
    //   .select("_id")
    //   .lean();
    // if (!organization) {
    //   return res.status(400).json({
    //     error: true,
    //     message: "Organization Not Found!",
    //   });
    // }

    const taskDetails = {
      ...req.body,
      orgId,
      userId: uid,
    };
    const newTask = await Task.create(taskDetails);
    res.status(200).json({ success: true, newTask });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  const { oid } = req;
  try {
    const {
      params: { id },
    } = req;
    const taskData = await Task.findOne({
      _id: id,
      orgId: oid,
    }).lean();
    if (!taskData) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, taskData });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const {
    params: { id: taskId },
    uid,
    oid,
  } = req;
  try {
    const taskData = await Task.findOne({
      _id: taskId,
      orgId: oid,
    });
    if (!taskData) {
      res.status(404).json({ message: `Task not found with Id ${taskId}` });
    }
    await taskData.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Task entity deleted.", id: taskId });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Errors",
      errors: errors.array(),
    });
  }
  const {
    params: { id: taskId },
    uid,
    oid,
  } = req;
  try {
    const task = await Task.findOneAndUpdate(
      { id: taskId, userId: uid, orgId: oid },
      req.body,
      { new: true, runValidators: true }
    ).lean();
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
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
