const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  milestone: {
    type: String,
    required: false,
  },
  projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  technology: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  work:{
    type: String,
    required: false
  },
  duration: {
    type: String,
    required: true,
  },
  deal: {
    type: Number,
    required: false,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  priority:{
    type: String,
    required: false
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
  description: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
},
{
  timestamps: true
});

// Create the project model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
