require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/Authentication.model");
const Profile = require("../model/Profile.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const login = async (req, res, next) => {
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
      return res
        .status(400)
        .json({ msg: "User Not Found. Please Check you email-address." });
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
    res.status(201).json({ success: true, msg: "Login Successfully", token });
  } catch (error) {
    next(error);
  }
};

const createNewUser = async (
  name,
  email,
  password,
  role = 0,
  dataInit = {}
) => {
  const profileDefaults = {
    phone_number: null,
    department: null,
    designation: null,
    skills: null,
    company: null,
    image: null,
    website: null,
    location: null,
    status: null,
    bio: null,
  };
  if (role && role === 1) {
    throw new Error("You cannot create admin");
  }
  try {
    let newUser = new User({
      name,
      email,
      password,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    const profileData = await Profile.findOne({ email: email });
    if (profileData) {
      throw new Error("Profile already exists with similar email-address");
    }
    await newUser.save();
    const userProfile = await Profile.create({
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      ...profileDefaults,
      ...dataInit,
    });
    return userProfile;
  } catch (error) {
    throw error;
  }
};

const register = async (req, res, next) => {
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
      return res
        .status(400)
        .json({ success: false, msg: "User already exists!" });
    }
    const profile = await createNewUser(name, email, password, 2);
    const token = jwt.sign({ profile }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ msg: "Registered Successfully", token });
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

module.exports = {
  login,
  register,
  createNewUser,
};
