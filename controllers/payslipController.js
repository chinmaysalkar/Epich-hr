const Payslip = require("../models/payslipModel");

const createPayslip = async (req, res) => {
  try {
    const { title, description, earnings, deduction, total } = req.body;

    // Generating a random string of 5 characters
    uniqueId = `PAYSLIP_${Math.floor(Math.random() * 8889) + 1111}`;

    const newPaySlip = new Payslip({
      id: uniqueId,
      title,
      description,
      earnings,
      deduction,
      total,
    });

    const savedPaySlip = await newPaySlip.save();
    res.status(201).json({
      success: true,
      message: "Payslip created successfully",
      data: savedPaySlip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const viewPayslip = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.body.id);

    if (!payslip) {
      return res.status(404).json({
        success: false,
        message: "Payslip not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payslip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePayslip = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    const updatedPayslip = await Payslip.findByIdAndUpdate(
      req.body.id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedPayslip) {
      return res.status(404).json({
        success: false,
        message: "Payslip not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Payslip updated successfully",
      data: updatedPayslip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayslip,
  viewPayslip,
  updatePayslip,
};
