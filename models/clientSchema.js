const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: false,
    },
    address2: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
      enum: ["Male", "Female", "Other"],
    },
    state: {
      type: String,
      required: false,
    },
    pincode: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    facebooklink: {
      type: String,
      required: false,
    },
    instagramlink: {
      type: String,
      required: false,
    },
    twitterlink: {
      type: String,
      required: false,
    },
    linkdinlink: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
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
const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
