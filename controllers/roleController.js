const Role = require("../models/globalModel");

const createRole = async (req, res) => {
  try {
    const role = new Role(req.body);

    const newRole = await role.save();
    res.status(200).json({
      success: true,
      message: "Role created successfully",
      data: newRole,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const viewRole = async (req, res) => {
  try {
    const roles = await Role.find({ status: true });

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    const updatedRole = await Role.findByIdAndUpdate(
      req.body.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({
        success: false,
        error: "Role not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: updatedRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Role ID is required",
      });
    }
    const role = await Role.findById(id);
    if (!role || !role.status) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }
    //mark as deleted
    role.status = false;
    await role.save();
    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createRole, viewRole, updateRole, deleteRole };
