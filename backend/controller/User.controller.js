const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../model/Authentication");
const Profile = require("../model/Profile");
const { createNewUser } = require("./Authentication.controller");
const { validationResult } = require("express-validator");
const { authAdminRole } = require("../utils/constants");


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

const profileList = async (req, res) => {
  const { uid } = req;
  const userRole = req.user.profile.role;
  const limit = parseInt(req.query.limit) || 20;
  const fields = req.query.fields
    ? req.query.fields.split(" ")
    : ["name", "email", "role"];
  try {
    let profileList;
    if (userRole === 1) {
      profileList = await Profile.find().select(fields).limit(limit).lean();
    } else if (userRole === 2) {
      profileList = await Profile.aggregate([
        {
          $lookup: {
            from: "organizations",
            localField: "orgId",
            foreignField: "_id",
            as: "organization",
          },
        },
        {
          $unwind: {
            path: "$organization",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $or: [
              { "organization.adminId": new mongoose.Types.ObjectId(uid) },
              { userId: new mongoose.Types.ObjectId(uid) },
            ],
            role: { $ne: 1 },
          },
        },
        {
          $project: fields.reduce(
            (acc, field) => {
              acc[field] = 1;
              return acc;
            },
            { _id: 1 }
          ),
        },
        { $limit: limit },
      ]);
    } else {
      profileList = await Profile.find({ role: { $ne: 1 } })
        .select(fields)
        .limit(limit)
        .lean();
    }
    return res.status(200).json({
      success: true,
      profileList,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const createProfile = async (req, res) => {
  const { name, email, orgId, ...entity } = req.body;
  const userId = req.uid;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }
    let user = await User.findOne({ email }).select("_id").lean();
    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists." });
    }
    const username = email.match(/^[^@]+/)[0];
    const newProfile = await createNewUser(
      res,
      name,
      email,
      username,
      0,
      orgId,
      userId
    );
    if (!newProfile) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    res.status(200).json({ success: true, message: "New Profile Created" });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Server Error");
  }
};

const updateProfile = async (req, res) => {
  const id = req.params.id;
  try {
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
    res.status(500).send(error);
  }
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const profileData = await Profile.findById(id)
      .select("_id, userId, role")
      .lean();
    // Find the Profile
    if (!profileData) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: true, msg: "Profile not found" });
    }
    const userData = await User.findById(profileData.userId)
      .select("_id")
      .lean();
    if (!userData) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: true, msg: "User not found" });
    }

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
    console.error("Error deleting profile and user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProfileImage = async (req, res) => {
  const id = req.params.id;
  try {
    const imagePath = `/uploads/${req.file.filename}`;
    await Profile.findByIdAndUpdate({ _id: id }, { image: imagePath });
    res.status(200).json({ message: "Image is uploaded", image: imagePath });
  } catch (error) {
    res.status(500).send(error);
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
