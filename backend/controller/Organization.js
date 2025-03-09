require("dotenv").config();
const mongoose = require("mongoose");
const Organization = require("../model/Organization");
const jwt = require("jsonwebtoken");
const Profile = require("../model/Profile");
const Task = require("../model/Task");
const Authentication = require("../model/Authentication");

const organizationList = async (req, res) => {
  try {
    const userRole = req.user.profile.role;
    let organizationData;
    if (userRole === 1) {
      organizationData = await Organization.find().select("-roles");
    } else {
      organizationData = await Organization.find({
        adminId: req.uid,
      }).select("-roles");
    }
    res
      .status(200)
      .json({ msg: "Fetched organization list.", data: organizationData });
  } catch (error) {
    console.error(error.message);
  }
};

const createOrganization = async (req, res) => {
  try {
    const isExists = await Organization.findOne({ name: req.body.name });
    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: "Organization already exists with this name.",
      });
    }
    const organization = new Organization({
      ...req.body,
      adminId: req.uid,
    });
    await organization.save();
    return res
      .status(200)
      .json({ msg: "New Organization is Created.", data: organization });
  } catch (error) {
    console.error(error.message);
  }
};

const getOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organizationData = await Organization.findOne({ _id: id }).select(
      "-roles"
    );
    if (!organizationData) {
      return res
        .status(400)
        .json({ success: false, msg: "Organization Not Found" });
    }
    return res
      .status(200)
      .json({ msg: "Fetched organization data.", data: organizationData });
  } catch (error) {
    console.error(error.message);
  }
};

const editOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findOne({ _id: id });
    if (!organization) {
      return res
        .status(404)
        .json({ success: false, msg: "Organization not found!" });
    }
    const updateOrganization = await Organization.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    ).select("-roles");
    return res
      .status(200)
      .json({ msg: "Updated organization", data: updateOrganization });
  } catch (error) {
    console.error(error.message);
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
      .json({ success: true, msg: "Organization Deleted." });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  organizationList,
  getOrganization,
  createOrganization,
  editOrganization,
  deleteOrganization,
};
