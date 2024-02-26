const Ticket = require("../models/ticketModel");

const createTicket = async (req, res) => {
  try {
    const { ticketId, title, activity, department, createdBy, priority } =req.body;

    if (!title ||!createdBy) {
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
    const ticket = await Ticket.find({_id:req.body.id})
    .populate({path: "department"}).populate({path: "createdBy"});

    if (!ticket || ticket.status==false) {
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

const updateTicket = async (req, res) => {
  try {
      const { id , ...updatedData } = req.body;

      if (!id) {
          return res.status(400).json({ success: false, message: 'User ID is required' });
      }

      const updatedTicket = await Ticket.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedTicket || !updatedTicket.status) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, message: 'User updated successfully', data: updatedTicket });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.body.id);
    if (!ticket || !ticket.status) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    //mark as deleted
    ticket.status = false
    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createTicket, viewTicket , updateTicket, deleteTicket};
