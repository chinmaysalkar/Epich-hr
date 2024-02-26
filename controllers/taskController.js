const Taskboard = require("../models/taskboard");

const addTask = async (req, res, next) => {
  try {
    const { task, description, startDate, endDate, action, team } = req.body;
    const newTask = new Taskboard({
      task,
      description,
      startDate,
      endDate,
      action,
      team,
    });
    const addtask = await newTask.save();
    res.status(200).json({
      message: "Task is added succesfully ",
      newTask,
    });
  } catch (error) {
    next(error);
  }
};

const viewTask = async (req, res, next) => {
  try {
    const viewtask = await Taskboard.find({ status: "true" }).populate({
      path: "team",
    });
    res.status(200).json({
      message: "task shown succesfully",
      viewtask,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const updatetask = await Taskboard.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    if (!updatetask) {
      res.status(404).json({ message: "taskId not found " });
    }
    res.status(200).json({ message: "task updated succesfully", updatetask });
  } catch (error) {
    next(error);
  }
};
const deleteT = async (req, res, next) => {
  try {
    const task = req.params.Id;
    const deletetask = await Taskboard.findByIdAndUpdate(
      task,
      req.body,
      { $set: { status: false } },
      { new: true }
    );
    if (!deketetask) {
      return res.status(400).json({ message: "task id not foundk" });
    }
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTask,
  viewTask,
  //   deleteTask,
  updateTask,
  deleteT,
};
