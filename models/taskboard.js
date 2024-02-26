const mongoose = require("mongoose");

const taskBoardSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: false,
      enum: ["in progress", " planned", "completed"],
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Taskboard = mongoose.model("Taskboard", taskBoardSchema);
module.exports = Taskboard;
