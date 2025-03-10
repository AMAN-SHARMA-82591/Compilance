const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name field is required"],
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      RegExp: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Provide a valid email!",
      ],
      unique: true,
    },
    image: {
      type: String,
      unique: false,
    },
    company: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: Number,
      default: 0,
    },
    skills: {
      type: [String],
    },
    bio: {
      type: String,
    },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

module.exports = Profile = mongoose.model("Profile", profileSchema);
