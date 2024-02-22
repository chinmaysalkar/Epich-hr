const Payslip = require("../models/payslipModel");

const createPayslip = async (req, res) => {
  try {
    const { title, description, earnings, deduction, total } = req.body;

    // Generating a random number of 4 characters
    uniqueId = `PAYSLIP_${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`;

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
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Payslip ID is required",
      });
    }
    const payslip = await Payslip.findById(id);

    if (!payslip || !payslip.status) {
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

const deletePayslip = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Payslip ID is required",
      });
    }
    const payslip = await Payslip.findById(id);
    if (!payslip || !payslip.status) {
      return res.status(404).json({
        success: false,
        message: "Payslip not found",
      });
    }
    //mark as deleted
    payslip.status = false
    await payslip.save();

    res.status(200).json({
      success: true,
      message: "Payslip deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createPayslip,
  viewPayslip,
  updatePayslip,
  deletePayslip
};
