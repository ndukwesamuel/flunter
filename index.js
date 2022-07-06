const express = require("express");
const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();

// const cors = require("cors");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

// connectDB();

app.use(express.json());
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // res.json("")
  res.send("<h1> Samheart</h1>");
  //   res.json()
});

app.listen(port, () => {
  console.log(`Backend server is running! ${port}`);
});
