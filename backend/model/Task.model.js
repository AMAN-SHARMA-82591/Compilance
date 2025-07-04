const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      // validate: {
      //     validator: function (value) {
      //         return ['overdue', 'in-progress', 'upcoming', 'not-started', 'closed', 'pending'].includes(value);
      //     },
      //     message: 'Invalid Value for Status',
      // },
      enum: [
        "overdue",
        "in-progress",
        "upcoming",
        "not-started",
        "closed",
        "pending",
      ],
      required: [true, "Status field is required"],
    },
    title: {
      type: String,
      required: [true, "Title field is required"],
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Organization ID is required"],
    },
    type: {
      type: String,
      enum: ["enhancement", "task", "bug", "epic"],
      required: [true, "Type field is required"],
    },
    priority: {
      type: String,
      enum: ["major", "blocker", "critical", "minor"],
      required: [true, "Piority field is required"],
    },
    // accessRoles: {
    //   type: [Number],
    //   default: [1, 2], // Default roles that can access the task
    // },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
