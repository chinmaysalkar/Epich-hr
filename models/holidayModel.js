const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema(
  {
    holidayId: {
      type: String,
      required: true,
      unique: true,
    },
    holidayName: {
      type: String,
      required: true,
    },
    holidayDate: {
      type: Date,
      required: true,
    },
    holidayDay: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Holiday = mongoose.model("Holiday", holidaySchema);

module.exports = Holiday;
