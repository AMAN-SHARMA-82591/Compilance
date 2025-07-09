require("dotenv").config();
// const jwt = require("jsonwebtoken");
const User = require("../model/Authentication.model");
const Profile = require("../model/Profile.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { tempPassword, allowedOrigins } = require("../utils/constants");
const verifyIDToken = require("../service/googleAuthService");
const { setAuthCookie } = require("../utils/cookieHelpers");
const {
  getLinkedInUserData,
  getLinkedInAccessToken,
} = require("../service/linkedInAuthService");
const {
  getGithubAccessToken,
  getGithubUserData,
  getGithubEmailData,
} = require("../service/githubAuthService");
// const cloudinary = require("../utils/cloudinary");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Errors",
      errors: errors.array(),
    });
  }
  try {
    const user = await User.findOne({ email }).lean();
    //compare password
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please check your email address.",
      });
    }
    // const profile = await Profile.findOne({ userId: user._id }).lean();
    // if (profile.image) {
    //   const optimizeImage = cloudinary.url(profile.image, {
    //     fetch_format: "auto",
    //     quality: "auto:low",
    //   });
    // }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    setAuthCookie(res, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    res
      .status(200)
      .json({ success: true, message: "Login Successfully", uid: user._id });
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
      message: "Errors",
      errors: errors.array(),
    });
  }
  try {
    const user = await User.findOne({ email }).select("_id").lean();
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }
    const profile = await createNewUser(name, email, password, 2);
    setAuthCookie(res, {
      id: profile.userId,
      name: profile.name,
      email: profile.email,
      role: profile.role,
    });
    res
      .status(201)
      .json({ message: "Registered Successfully", uid: profile.userId });
  } catch (error) {
    if (
      error.message === "Profile already exists with similar email-address" ||
      error.message === "You cannot create admin"
    ) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const googleLogin = async (req, res, next) => {
  const { idToken } = req.body;
  try {
    const { name, email } = await verifyIDToken(idToken);

    const user = await User.findOne({ email }).lean();

    if (!user) {
      const profile = await createNewUser(name, email, tempPassword(email), 2);
      setAuthCookie(res, {
        id: profile.userId,
        name: profile.name,
        email: profile.email,
        role: profile.role,
      });
      return res.status(201).json({
        success: true,
        message: "Login Successful",
        uid: profile.userId,
      });
    }
    setAuthCookie(res, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    return res
      .status(200)
      .send({ success: true, message: "Login Successful", uid: user._id });
  } catch (error) {
    next(error);
  }
};

const githubLogin = async (req, res, next) => {
  const { code } = req.body;
  try {
    const tokenData = await getGithubAccessToken(code);
    const { name, email } = await getGithubUserData(tokenData);

    let emailAddress = email;

    if (!emailAddress) {
      emailAddress = await getGithubEmailData(tokenData);
    }
    const user = await User.findOne({ email: emailAddress }).lean();
    if (!user) {
      const profile = await createNewUser(
        name,
        emailAddress,
        tempPassword(emailAddress),
        2
      );
      setAuthCookie(res, {
        id: profile.userId,
        name: profile.name,
        email: profile.email,
        role: profile.role,
      });
      return res.status(201).json({
        success: true,
        message: "Login Successful",
        uid: profile.userId,
      });
    }
    setAuthCookie(res, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    return res
      .status(200)
      .send({ success: true, message: "Login Successful", uid: user._id });
  } catch (error) {
    next(error);
  }
};

const linkedinLogin = async (req, res, next) => {
  const { code, redirectUri } = req.body;
  try {
    if (!allowedOrigins.includes(redirectUri)) {
      return res.status(401).json({
        success: false,
        message: "You are not allowed to send request",
      });
    }
    const tokenData = await getLinkedInAccessToken(code, redirectUri);
    const { name, email } = await getLinkedInUserData(tokenData);

    const user = await User.findOne({ email }).lean();
    if (!user) {
      const profile = await createNewUser(name, email, tempPassword(email), 2);
      setAuthCookie(res, {
        id: profile.userId,
        name: profile.name,
        email: profile.email,
        role: profile.role,
      });
      return res.status(201).json({
        success: true,
        message: "Login Successful",
        uid: profile.userId,
      });
    }

    setAuthCookie(res, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      uid: user._id,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  register,
  googleLogin,
  githubLogin,
  linkedinLogin,
  createNewUser,
};
