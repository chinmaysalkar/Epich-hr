const Client = require("../models/clientSchema");

const createClient = async (req, res) => {
  try {
    const uniqueId = `CLT_${Math.floor(Math.random() * 8889) + 1111}`;
    const {
      fullName,
      email,
      companyName,
      country,
      image,
      projects,
      facebooklink,
      instagramlink,
      twitterlink,
      linkdinlink,
      address1,
      address2,
      city,
      state,
      pincode,
    } = req.body;

    const addClient = new Client({
      fullName,
      email,
      companyName,
      country,
      clientId: uniqueId,
      image,
      projects,
      facebooklink,
      instagramlink,
      twitterlink,
      linkdinlink,
      address1,
      address2,
      city,
      state,
      pincode,
    });

    const newClient = await addClient.save();
    res.status(201).json({
      message: "client created succesfully",
      newClient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const viewClient = async (req, res) => {
  try {
    const clientView = await Client.find({ status: true }).populate({
      path: "projects",
    });

    res.status(200).json({
      message: "client viewed succesfully",
      clientView,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const clientDeleted = await Client.findByIdAndUpdate(
      clientId,
      { $set: { status: false } },
      { new: true }
    );
    if (!clientDeleted) {
      return res.status(404).json({
        message: "client id not found ",
      });
    }
    res.status(200).json({
      message: "client deleted succesfully",
      clientDeleted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const clientUpdate = await Client.findByIdAndUpdate(clientId, req.body, {
      new: true,
    });
    if (!clientUpdate) {
      return res.status(404).json({
        message: "client Id not found for update client",
      });
    }
    res.status(200).json({
      message: "client updated succesfully",
      clientUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createClient,
  viewClient,
  deleteClient,
  updateClient,
};
