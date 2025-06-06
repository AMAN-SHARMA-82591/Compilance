require("dotenv").config();
const mongoose = require("mongoose");
const Organization = require("../model/Organization");
const Profile = require("../model/Profile");
const Task = require("../model/Task");
const Authentication = require("../model/Authentication");

const organizationList = async (req, res, next) => {
  try {
    const userRole = req.user.profile.role;
    let organization;
    if (userRole === 1) {
      organization = await Organization.find().select("-roles").lean();
    } else {
      organization = await Organization.find({
        adminId: req.uid,
      })
        .select("-roles")
        .lean();
    }
    res.status(200).json({ msg: "Fetched organization list.", organization });
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
        msg: "Organization already exists with this name.",
      });
    }
    const orgData = await Organization.create({
      ...req.body,
      adminId: req.uid,
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
        .json({ success: false, msg: "Organization Not Found" });
    }
    return res
      .status(200)
      .json({ msg: "Fetched organization data.", data: organizationData });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
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
        .json({ success: false, msg: "Organization not found!" });
    }
    const updateOrganization = await Organization.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-roles");
    return res
      .status(200)
      .json({ msg: "Updated organization", data: updateOrganization });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error",
      error: error.message,
    });
  }
};

const deleteOrganization = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const organization = await Organization.findOne({ _id: id }).session(
      session
    );
    if (!organization) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, msg: "Organization not found!" });
    }

    // Delete Profile and users attached with organization
    const profileIds = await Profile.find({ orgId: id })
      .select("_id userId")
      .session(session);
    const userIds = profileIds.map((profile) => profile.userId);
    await Profile.deleteMany({ orgId: id }).session(session);
    await Authentication.deleteMany({ _id: { $in: userIds } }).session(session);

    // Delete Tasks
    await Task.deleteMany({ orgId: id }).session(session);

    // Delete Organization
    await Organization.findOneAndDelete({ _id: id }).session(session);

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ success: true, msg: "Organization Deleted.", _id: id });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      msg: "Server Error",
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
