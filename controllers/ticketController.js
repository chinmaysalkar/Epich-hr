const Ticket = require("../models/ticketModel");

const createTicket = async (req, res) => {
  try {
    const { ticketId, title, activity, department, createdBy, priority } =req.body;

    if (!ticketId ||!title ||!createdBy) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uniqueId = `TICKET_${Math.floor(Math.random() * 8889) + 1111}`;

    const ticket = new Ticket({
      ticketId: uniqueId,
      title,
      activity,
      department,
      createdBy,
      priority,
    });

    const newTicket = await ticket.save();
    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: newTicket,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const viewTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({_id:req.body.id},{ status: true },)
    .populate({path: "department",})
    .populate({path: "createdBy",});

    if (!tickets) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createTicket, viewTicket };
