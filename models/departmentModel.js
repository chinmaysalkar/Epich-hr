const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentId: {
      type: String,
      required: true,
      unique: true,
    },
    departmentName: {
      type: String,
      required: true,
    },
    departmentHead: {
      type: String,
      required: true,
    },
    totalEmployees: {
      type: Number,
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
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
