const Holiday = require("../models/holidayModel");
const moment = require("moment");
const addHoliday = async (req, res) => {
  try {
    const { holidayName, holidayDate, holidayDay } = req.body;
    const formattedDate = moment(holidayDate, "YYYY-MM-DD");

    const uniqueId = `HLD_${Math.floor(Math.random() * 8889) + 1111}`;

    const holiday = new Holiday({
      holidayName,
      holidayDate: formattedDate,
      holidayDay,
      holidayId: uniqueId,
    });

    const addedHoliday = await holiday.save();

    res.status(201).json({
      message: "New holiday added successfully",
      addedHoliday,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const viewHoliday = async (req, res) => {
  try {
    const allHolidays = await Holiday.find({ status: true });

    res.status(200).json({
      message: "All holidays shown  successfully",
      holidays: allHolidays,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const updateHoliday = async (req, res) => {
  try {
    const holidayId = req.params.holidayId;
    console.log(holidayId);
    const updatedHoliday = await Holiday.findByIdAndUpdate(
      holidayId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHoliday) {
      return res.status(404).json({
        message: "Holiday Id not found",
      });
    }
    await updatedHoliday.save();
    res.status(200).json({
      message: "Holiday updated successfully",
      updatedHoliday,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteHoliday = async (req, res) => {
  try {
    const holidayId = req.params.holidayId;

    const deletedHoliday = await Holiday.findByIdAndUpdate(
      holidayId,
      { $set: { status: false } },
      { new: true }
    );

    if (!deletedHoliday) {
      return res.status(404).json({
        message: "Holiday Id not found",
      });
    }

    res.status(200).json({
      message: "Holiday deleted successfully",
      deletedHoliday,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  addHoliday,
  viewHoliday,
  updateHoliday,
  deleteHoliday,
};
