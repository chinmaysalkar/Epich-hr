require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const router = require("./routes/router");

const app = express();
const uri = process.env.DB_URI;
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("EpicHR server is running ");
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to epicHR database");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
