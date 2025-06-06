require("dotenv").config();
const Organization = require("../model/Organization.model");
const Task = require("../model/Task.model");
const { validationResult } = require("express-validator");
// const { profile } = require("./User.controller");
const { default: mongoose } = require("mongoose");
// const { authAdminRole } = require("../utils/constants");

const taskList = async (req, res) => {
  const { uid, oid, user } = req;
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const filter = req.query.filter || "";

    let query = {
      title: { $regex: search, $options: "i" },
      type: { $regex: filter, $options: "i" },
    };

    if (user.profile.role === 1) {
      query = {};
    } else if (user.profile.role === 2) {
      const organizationList = await Organization.find({ _id: oid })
        .select("_id")
        .lean();

      const orgIds = organizationList.map((org) => org._id);

      query = {
        orgId: { $in: orgIds },
      };
    } else {
      query.orgId = oid;
    }

    const taskList = await Task.find(query)
      .skip(page * limit)
      .limit(limit)
      .lean();
    return res.status(200).json({
      success: true,
      msg: "Fetched Task List",
      taskList,
      length: taskList.length,
    });
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Error", error: error.message });
  }
};

const progressOverviewData = async (req, res) => {
  const { uid, oid, user } = req;
  try {
    let query = { userId: uid, orgId: oid };

    if (user.profile.role === 1) {
      query = {};
    } else if (user.profile.role === 2) {
      query = { userId: uid };
    }
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
    res.json({
      overdue: overdue,
      upcoming: upcomingCount,
      in_progress: inProgressCount,
      total: totalCount,
    });
  } catch (error) {}
};

const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  const { uid, oid } = req;
  try {
    const orgId = req.body.orgId || oid;
    if (orgId && !mongoose.Types.ObjectId.isValid(orgId)) {
      return res.status(400).json({
        error: true,
        msg: "Invalid Organization ID",
      });
    }

    // const organization = await Organization.findById(orgId)
    //   .select("_id")
    //   .lean();
    // if (!organization) {
    //   return res.status(400).json({
    //     error: true,
    //     msg: "Organization Not Found!",
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
    }).lean();
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
    const task = await Task.findOneAndUpdate(
      { taskId, rootUserId: uid, orgId: oid },
      req.body,
      { new: true, runValidators: true }
    ).lean();
    res.status(200).json({ success: true, task });
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
