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

app.post("/", (req, res) => {
  console.log(req.body);
  const { ID, Amount, Currency, CustomerEmail, SplitInfo } = req.body;

  // res.json("")
  //   res.send("<h1> Samheart</h1>");
  const Userdata = {
    id: ID,
    Balance: Amount,
    SplitBreakdown: [
      {
        SplitEntityId: "LNPYACC0019",
        Amount: 5000,
      },
      {
        SplitEntityId: "LNPYACC0011",
        Amount: 2000,
      },
      {
        SplitEntityId: "LNPYACC0015",
        Amount: 2000,
      },
    ],
  };
  res.status(200).json(Userdata);
});

app.post("/split-payments/compute", (req, res) => {
  const { ID, Amount, Currency, CustomerEmail, SplitInfo } = req.body;

  // res.json("")
  //   res.send("<h1> Samheart</h1>");
  const Userdata = {
    id: ID,
    Balance: Amount,
    SplitBreakdown: [
      {
        SplitEntityId: "LNPYACC0019",
        Amount: 5000,
      },
      {
        SplitEntityId: "LNPYACC0011",
        Amount: 2000,
      },
      {
        SplitEntityId: "LNPYACC0015",
        Amount: 2000,
      },
    ],
  };
  res.status(200).json(Userdata);
});

app.listen(port, () => {
  console.log(`Backend server is running! ${port}`);
});
