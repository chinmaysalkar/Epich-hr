const Department = require("../models/departmentModel");

const addDepartment = async (req, res) => {
  try {
    const {
      departmentName,
      departmentHead,
      totalEmployees
    } = req.body;
    const uniqueId= `DEPT_${Math.floor(Math.random() * 8889) + 1111}`;

    const department = new Department({
      departmentName,
      departmentHead,
      totalEmployees,
      departmentId: uniqueId,
    });
    const addDept = await department.save();
    res.status(201).json({
      message: " New department added succesfully",
      addDept,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const viewDepartment = async (req, res) => {
  try {
    const viewDept = await Department.find({ status: true });
    res.status(200).json({
      message: "All the department show succesfully",
      viewDept,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;

    const deptId = await Department.findByIdAndUpdate(departmentId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!deptId) {
      return res.status(404).json({
        message: "Department Id not found",
      });
    }

    const updatedDept = await deptId.save();
    res.status(200).json({
      message: "Department updated succesfully",
      updatedDept,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const deleteDepartment = async (req, res) => {
  try {
    const delId = req.params.departmentId;
    const deptId = await Department.findByIdAndUpdate(
      delId,
      { $set: { status: false } },
      { new: true }
    );
    if (!deptId) {
      return res.status(404).json({
        message: "Department Id not found",
      });
    }
    res.status(200).json({
      message: "department is deleted succesfully",
      deptId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  addDepartment,
  viewDepartment,
  updateDepartment,
  deleteDepartment,
};
