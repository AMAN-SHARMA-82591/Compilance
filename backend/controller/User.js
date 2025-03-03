require("dotenv").config();
const User = require("../model/Authentication");
const Profile = require("../model/Profile");
const bcrypt = require("bcryptjs");
const { createNewUser } = require("./Authentication");

// List of Users
const users = async (req, res) => {
  try {
    const profiles = await User.find().select("name email").exec();
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
    const userData = await User.findOne({ _id: uid });

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

    const profileData = await Profile.findById({ _id: id });
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
  const limit = parseInt(req.query.limit) || 20;
  const fields = req.query.fields || "name email";
  try {
    const profileList = await Profile.find({ role: { $ne: 1 } })
      .select(fields)
      .limit(limit);
    if (!profileList) {
      return res.status(400).json({ msg: "There is no profile List." });
    }
    setTimeout(() => {
      return res.status(200).json(profileList);
    }, 1000);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const createProfile = async (req, res) => {
  const { name, email, orgId, ...entity } = req.body;
  if (!email || !name) {
    return res.status(400).send("Fields Required");
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists." });
    }
    const username = email.match(/^[^@]+/)[0];
    const newProfile = await createNewUser(res, name, email, username, 0, orgId);
    if (!newProfile) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    res.status(200).json({ message: "New Profile Created", newProfile });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Server Error");
  }
};

const updateProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body);
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
  updateProfileImage,
};
