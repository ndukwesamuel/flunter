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
  const { ID, Amount, Currency, CustomerEmail, SplitInfo } = req.body;

  // res.json("")
  //   res.send("<h1> Samheart</h1>");

  let amount = Amount;

  const flat = [];
  const ratio = [];
  const Percentage = [];
  let flat_amount = 0;
  SplitInfo.map((item) => {
    const { SplitType } = item;
    if (SplitType === "FLAT") {
      flat.push(item);
    } else if (SplitType === "RATIO") {
      ratio.push(item);
    } else if (SplitType === "PERCENTAGE") {
      Percentage.push(item);
    } else {
      console.log("error");
    }
  });

  while (flat.length > 0) {
    flat.map((item) => {
      const { SplitValue } = item;
      amount -= SplitValue;
    });
    break;
  }

  let testPe = [];

  while (Percentage.length > 0) {
    Percentage.map((item) => {
      const { SplitValue, SplitEntityId } = item;
      per_amount = (SplitValue / 100) * amount;
      const per_new = {
        SplitEntityId: SplitEntityId,
        Amount: per_amount,
      };
      testPe.push(per_new);
      amount -= per_amount;
    });
    break;
  }

  console.log(testPe);
  let total_ratio = 0;

  while (ratio.length > 0) {
    ratio.map((item) => {
      const { SplitValue, SplitEntityId } = item;
      total_ratio += SplitValue;
      console.log(`${amount} new`);
      amount = (SplitValue / total_ratio) * amount;

      const ras = {
        SplitEntityId: SplitEntityId,
        Amount,
      };

      //   const { SplitValue } = item;

      //   (SplitValue * amount )
      //   amount -= SplitValue;
    });

    console.log(total_ratio);
    break;
  }

  console.log(amount);
  const data = [ratio, flat, Percentage];

  res.status(200).json(data);

  //   const Userdata = {
  //     id: ID,
  //     Balance: Amount,
  //     SplitBreakdown: [
  //       {
  //         SplitEntityId: "LNPYACC0019",
  //         Amount: 5000,
  //       },
  //       {
  //         SplitEntityId: "LNPYACC0011",
  //         Amount: 2000,
  //       },
  //       {
  //         SplitEntityId: "LNPYACC0015",
  //         Amount: 2000,
  //       },
  //     ],
  //   };
  //   res.status(200).json("Userdata");
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
