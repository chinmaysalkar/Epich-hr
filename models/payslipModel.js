const mongoose = require("mongoose");

const payslipSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    earnings: {
        type: Number,
        required: false,
    },
    deduction: {
        type: Number,
        required: false,
    },
    total:{
        type: Number,
        required: true,
    }
});

const PaySlip = mongoose.model("Payslip", payslipSchema);
module.exports = PaySlip;