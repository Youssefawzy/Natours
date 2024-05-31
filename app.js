const express = require("express");
const dotenv = require("dotenv");
const Tour = require("./modules/tourModel");
const tourRouter = require("./routes/tourRoute");
const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/tours", tourRouter);
module.exports = app;
