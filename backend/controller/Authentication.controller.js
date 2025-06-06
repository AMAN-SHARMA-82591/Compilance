require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/Authentication");
const Profile = require("../model/Profile");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  try {
    const user = await User.findOne({ email }).lean();
    //compare password
    if (!user) {
      return res.status(400).json({ msg: "User Not Found." });
    }
    const profile = await Profile.findOne({ userId: user._id });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ profile }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

const createNewUser = async (
  res,
  name,
  email,
  password,
  role = 0,
  orgId = null,
  adminId = null
) => {
  try {
    if (role && role === 1) {
      return res.status(400).json({
        success: false,
        msg: "You cannot create admin",
      });
    }
    let newUser = new User({
      name,
      email,
      password,
      role,
      orgId,
      adminId,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    const userProfile = await Profile.create({
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone_number: null,
      department: null,
      designation: null,
      orgId,
      adminId,
      skills: null,
      company: null,
      image: null,
      website: null,
      location: null,
      status: null,
      bio: null,
    });
    return userProfile;
  } catch (error) {
    console.error("Error creating user or profile:", error);
    return res.status(404).json({ error: true, msg: "Something went wrong!" });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      msg: "Errors",
      errors: errors.array(),
    });
  }
  try {
    const user = await User.findOne({ email }).select("_id").lean();
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    const profile = await createNewUser(res, name, email, password, 2);
    if (!profile) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    const token = jwt.sign({ profile }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ msg: "Registered Successfully", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: true, msg: "Something weng wrong!" });
  }
};

module.exports = {
  login,
  register,
  createNewUser,
};
