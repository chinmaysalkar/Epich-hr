const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    permissions: {
      type: Object,
      required: true,
      default: {
        hrms: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
        project: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
        jobPortal: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
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

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
