const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    address: {
      type: String,
      required: [true, "Address field is required"],
    },
    city: {
      type: String,
      required: [true, "City field is required"],
    },
    state: {
      type: String,
      required: [true, "State field is required"],
    },
    country: {
      type: String,
      required: [true, "Country field is required"],
    },
    description: {
      type: String,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sub Admin ID is required"],
    },
    roles: {
      type: [Number],
      default: [0, 1, 2],
    },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

module.exports = mongoose.model("Organization", organizationSchema);
