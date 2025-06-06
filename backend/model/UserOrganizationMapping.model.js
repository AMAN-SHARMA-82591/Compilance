const mongoose = require("mongoose");

const UserOrganizationMappingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    role: { type: Number, required: true }, // 0 - user, 1 - admin, 2 - sub-admin, 5 - guest
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "UserOrganizationRole",
  UserOrganizationMappingSchema
);
