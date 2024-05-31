const express = require("express");
const dotenv = require("dotenv");
const Tour = require("./modules/tourModel");
const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const router = express.Router();

app.use(express.json());

app.get("/", async (req, res, next) => {
  console.log(process.env.NODE_ENV);
  console.log(req.body);
  const tours = await Tour.find();

  res.status(200).json({
    tours,
  });
});

module.exports = app;
