const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./modules/tourModel");
dotenv.config({ path: "./config.env" });

const app = express();
const router = express.Router();
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).json({
    tours,
  });
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server in running on ${port}`);
});
