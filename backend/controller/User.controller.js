const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../model/Authentication.model");
const Profile = require("../model/Profile.model");
const { createNewUser } = require("./Authentication.controller");
const { validationResult } = require("express-validator");
const userOrgMap = require("../model/UserOrganizationMapping.model");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const fs = require("fs");
const UserOrganizationMappingModel = require("../model/UserOrganizationMapping.model");
const TaskModel = require("../model/Task.model");

// learn about exicts() method. This can improve api retrieval performance

// List of Users
const users = async (req, res) => {
  try {
    const profiles = await User.find().select("name email").exec().lean();
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Logged In User
const getUser = async (req, res) => {
  const { uid } = req;
  try {
    const userData = await User.findOne({ _id: uid }).lean();

    res.status(200).json({ success: true, msg: userData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Logged In Profile Details
const profile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.user.profile._id });
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const getProfile = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const profileData = await Profile.findById({ _id: id }).lean();
    if (!profileData) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).json(profileData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const profileList = async (req, res, next) => {
  const { uid, oid } = req;
  const limit = parseInt(req.query.limit) || 20;
  const fields = req.query.fields
    ? req.query.fields.split(" ")
    : ["name", "email", "role", "image"];
  try {
    const orgRelatedProfiles = await userOrgMap
      .find({ orgId: oid })
      .lean()
      .select("-_id userId");

    const userIds = orgRelatedProfiles.map((value) => value.userId);

    const pipeline = [
      { $match: { userId: { $in: userIds } } },
      {
        $addFields: {
          sortPriority: {
            $switch: {
              branches: [
                { case: { $eq: ["$role", 2] }, then: 0 },
                {
                  case: { $eq: ["$userId", new mongoose.Types.ObjectId(uid)] },
                  then: 0,
                },
              ],
              default: 2,
            },
          },
        },
      },
      { $sort: { sortPriority: 1 } },
      { $limit: limit },
      { $project: fields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}) },
    ];

    const profileList = await Profile.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      profileList,
    });
  } catch (error) {
    next(error);
  }
};

const createProfile = async (req, res, next) => {
  const { name, email, orgId, ...entity } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  try {
    let user = await User.findOne({ email }).select("_id").lean();
    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists." });
    }
    const username = email.match(/^[^@]+/)[0];
    const userData = await createNewUser(name, email, username, 0, entity);
    await userOrgMap.create({
      userId: userData.userId,
      orgId,
      role: 0,
    });
    res.status(200).json({ success: true, message: "New Profile Created" });
  } catch (error) {
    if (
      error.message === "Profile already exists with similar email-address" ||
      error.message === "You cannot create admin"
    ) {
      return res.status(400).json({ success: false, msg: error.message });
    }
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  const id = req.params.id;
  const { user } = req;
  try {
    if (id !== user.profile._id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this profile",
      });
    }
    if (req.body.email !== user.profile.email) {
      return res.status(403).json({
        success: false,
        message: "Cannot update email-address",
      });
    }
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    }).lean();
    if (!updatedProfile) {
      return res.status(404).send({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Profile has been updated.", data: updatedProfile });
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const profileData = await Profile.findById(id)
      .select("_id userId role")
      .lean();
    if (!profileData) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }
    const userData = await User.findById(profileData.userId)
      .select("_id")
      .lean();
    if (!userData) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Updating task
    await TaskModel.find({
      userId: { $in: profileData.userId },
    }).updateMany({ userId: null });

    // Deleting reference to organization
    await UserOrganizationMappingModel.deleteOne({
      userId: userData._id,
      orgId: req.oid,
    });

    //Deleting profile
    await Profile.findByIdAndDelete(id).session(session);

    // Deleting User
    await User.findByIdAndDelete(profileData.userId).session(session);

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ message: "Profile and user have been deleted." });
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const updateProfileImage = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload buffer to Cloudinary
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_images", public_id: id },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        // fs.createReadStream(buffer).pipe(stream);
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    // Save Cloudinary URL to profile
    await Profile.findByIdAndUpdate(id, { image: result.secure_url });

    res
      .status(200)
      .json({ message: "Image uploaded", image: result.secure_url });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  users,
  profile,
  getUser,
  profileList,
  getProfile,
  updateProfile,
  createProfile,
  deleteProfile,
  updateProfileImage,
};
