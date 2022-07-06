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

app.post("/testing_route", (req, res) => {
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

  let newFlatdata = [];

  while (flat.length > 0) {
    flat.map((item) => {
      const { SplitValue, SplitEntityId } = item;
      amount -= SplitValue;

      let flatdata = {
        SplitEntityId: SplitEntityId,
        Amount: SplitValue,
      };

      newFlatdata.push(flatdata);
    });
    break;
  }

  //   console.log(`${amount} in flat`);

  let newPercentage = [];

  while (Percentage.length > 0) {
    Percentage.map((item) => {
      const { SplitValue, SplitEntityId } = item;
      per_amount = (SplitValue / 100) * amount;
      const per_new = {
        SplitEntityId: SplitEntityId,
        Amount: per_amount,
      };
      newPercentage.push(per_new);
      amount -= per_amount;
    });
    break;
  }

  //   console.log(`${amount} in percentage`);

  //   console.log(testPe);
  let newratiodata = [];
  let total_ratio = 0;

  ratio.map((item) => {
    const { SplitValue, SplitEntityId } = item;
    total_ratio += SplitValue;
  });

  //   console.log(total_ratio);

  // while (ratio.length > 0) {
  //  let

  const Ramount = new Object();

  Ramount.amount = amount;

  console.log(Ramount);

  ratio.map((item) => {
    const newRatioamount = Ramount.amount;
    console.log(newRatioamount);
    const { SplitValue, SplitEntityId } = item;
    //   console.log(total_ratio + "ww");

    rai_amount = (SplitValue / total_ratio) * newRatioamount;

    const ras = {
      SplitEntityId: SplitEntityId,
      Amount: rai_amount,
    };
    console.log(newRatioamount + "new change1");
    console.log(amount + "amo change1");

    amount -= rai_amount;
    console.log(amount + "amo change2");
    console.log(newRatioamount + "new change2");
    newratiodata.push(ras);
  });

  //   break;
  // }

  //   console.log(`${amount} in Ratio`);

  //   const flat = [];
  //   const ratio = [];
  //   const Percentage = [];

  let Data_flat_percentage_ratio = [];

  for (let index = 0; index < newFlatdata.length; index++) {
    const element = newFlatdata[index];
    Data_flat_percentage_ratio.push(element);
  }

  for (let index = 0; index < newPercentage.length; index++) {
    const element = newPercentage[index];
    Data_flat_percentage_ratio.push(element);
  }

  for (let index = 0; index < newratiodata.length; index++) {
    const element = newratiodata[index];
    Data_flat_percentage_ratio.push(element);
  }

  console.log(Data_flat_percentage_ratio);

  const Userdata = {
    id: ID,
    Balance: amount,
    SplitBreakdown: Data_flat_percentage_ratio,
  };
  res.status(200).json(Userdata);
});

app.post("/split-payments/compute", (req, res) => {
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

  let newFlatdata = [];

  while (flat.length > 0) {
    flat.map((item) => {
      const { SplitValue, SplitEntityId } = item;
      amount -= SplitValue;

      let flatdata = {
        SplitEntityId: SplitEntityId,
        Amount: SplitValue,
      };

      newFlatdata.push(flatdata);
    });
    break;
  }

  //   console.log(`${amount} in flat`);

  let newPercentage = [];

  while (Percentage.length > 0) {
    Percentage.map((item) => {
      const { SplitValue, SplitEntityId } = item;
      per_amount = (SplitValue / 100) * amount;
      const per_new = {
        SplitEntityId: SplitEntityId,
        Amount: per_amount,
      };
      newPercentage.push(per_new);
      amount -= per_amount;
    });
    break;
  }

  //   console.log(`${amount} in percentage`);

  //   console.log(testPe);
  let newratiodata = [];
  let total_ratio = 0;

  ratio.map((item) => {
    const { SplitValue, SplitEntityId } = item;
    total_ratio += SplitValue;
  });

  //   console.log(total_ratio);

  while (ratio.length > 0) {
    ratio.map((item) => {
      const { SplitValue, SplitEntityId } = item;
      //   console.log(total_ratio + "ww");

      rai_amount = (SplitValue / total_ratio) * amount;

      const ras = {
        SplitEntityId: SplitEntityId,
        Amount: rai_amount,
      };
      amount -= rai_amount;
      newratiodata.push(ras);
    });

    break;
  }

  //   console.log(`${amount} in Ratio`);

  //   const flat = [];
  //   const ratio = [];
  //   const Percentage = [];

  let Data_flat_percentage_ratio = [];

  for (let index = 0; index < newFlatdata.length; index++) {
    const element = newFlatdata[index];
    Data_flat_percentage_ratio.push(element);
  }

  for (let index = 0; index < newPercentage.length; index++) {
    const element = newPercentage[index];
    Data_flat_percentage_ratio.push(element);
  }

  for (let index = 0; index < newratiodata.length; index++) {
    const element = newratiodata[index];
    Data_flat_percentage_ratio.push(element);
  }

  console.log(Data_flat_percentage_ratio);

  const Userdata = {
    id: ID,
    Balance: amount,
    SplitBreakdown: Data_flat_percentage_ratio,
  };
  res.status(200).json(Userdata);
});

app.listen(port, () => {
  console.log(`Backend server is running! ${port}`);
});
