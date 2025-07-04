require("dotenv").config();
const mongoose = require("mongoose");
const Organization = require("../model/Organization.model");
const Profile = require("../model/Profile.model");
const Task = require("../model/Task.model");
const User = require("../model/Authentication.model");
const UserOrgMap = require("../model/UserOrganizationMapping.model");

const organizationList = async (req, res, next) => {
  try {
    const userRole = req.user.role;
    let orgMap;
    if (userRole === 1) {
      orgMap = await UserOrgMap.find().lean();
    } else {
      orgMap = await UserOrgMap.find({
        userId: req.uid,
      })
        .lean()
        .select("orgId -_id");
    }
    const organizationIds = orgMap.map((org) => org.orgId);
    if (!organizationIds.length) {
      return res.status(200).json({ success: true, data: [] });
    }
    const organization = await Organization.find({
      _id: { $in: organizationIds },
    }).lean();
    return res.status(200).json({
      success: true,
      message: "Fetched organization list.",
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

const createOrganization = async (req, res, next) => {
  try {
    const isExists = await Organization.findOne({ name: req.body.name }).lean();
    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "Organization already exists with this name.",
      });
    }
    const orgData = await Organization.create({
      ...req.body,
    });
    await UserOrgMap.create({
      userId: req.uid,
      orgId: orgData._id,
      role: req.user.role,
    });
    return res.status(200).json({ success: true, orgData });
  } catch (error) {
    next(error);
  }
};

const getOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organizationData = await Organization.findOne({ _id: id })
      .select("-roles")
      .lean();
    if (!organizationData) {
      return res
        .status(400)
        .json({ success: false, message: "Organization Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Fetched organization data.", data: organizationData });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const editOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findOne({ _id: id })
      .select("_id")
      .lean();
    if (!organization) {
      return res
        .status(404)
        .json({ success: false, message: "Organization not found!" });
    }
    const updateOrganization = await Organization.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-roles");
    return res
      .status(200)
      .json({ message: "Updated organization", data: updateOrganization });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const deleteOrganization = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const organization = await Organization.findOne({ _id: id })
      .session(session)
      .lean()
      .select("_id");
    if (!organization) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, message: "Organization not found!" });
    }

    const orgMap = await UserOrgMap.find({ orgId: id, role: 0 })
      .lean()
      .select("-_id userId");
    const userIds = orgMap.map((org) => org.userId);
    // // Delete Profile and users attached with organization
    await Profile.deleteMany({ userId: { $in: userIds } }).session(session);
    await User.deleteMany({ _id: { $in: userIds } }).session(session);

    // Delete Tasks
    await Task.deleteMany({ orgId: id }).session(session);

    // Delete Organization
    await Organization.findOneAndDelete({ _id: id }).session(session);

    // Delete Organization Mapping
    await UserOrgMap.deleteMany({
      orgId: id,
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ success: true, message: "Organization Deleted.", _id: id });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  organizationList,
  getOrganization,
  createOrganization,
  editOrganization,
  deleteOrganization,
};
