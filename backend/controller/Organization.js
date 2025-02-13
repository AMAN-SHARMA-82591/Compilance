require("dotenv").config();
const Organization = require("../model/Organization");
const jwt = require("jsonwebtoken");
const Profile = require("../model/Profile");

const organizationList = async (req, res) => {
  try {
    res.status(200).json({ msg: "complete List" });
  } catch (error) {
    console.error(error.message);
  }
};

const createOrganization = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    await organization.save();

    const profile = await Profile.findOneAndUpdate(
      { userId: req.uid },
      { oid: organization._id },
      { new: true }
    );
    const token = jwt.sign({ profile }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
  }
};

const getOrganization = async (req, res) => {
  try {
    res.status(200).json({ msg: "complete with Id" });
  } catch (error) {
    console.error(error.message);
  }
};

const editOrganization = async (req, res) => {
  try {
    res.status(200).json({ msg: "Edit complete" });
  } catch (error) {
    console.error(error.message);
  }
};

const deleteOrganization = async (req, res) => {
  try {
    res.status(200).json({ msg: "Delete complete" });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  organizationList,
  getOrganization,
  createOrganization,
  editOrganization,
  deleteOrganization,
};
