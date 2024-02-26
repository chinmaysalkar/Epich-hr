const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    ticketId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: false
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    priority: {
        type: String,
        required: false,
        enum: ['Low', 'Medium', 'High'],
        
    },
    date:{
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    },

}, {
    timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema)
module.exports = Ticket