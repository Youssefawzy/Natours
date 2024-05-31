const express = require("express");
const tourController = require("./../controllers/toursController");
const router = express.Router();

router.get("/", tourController.getAllTours);

router.route("/:id").get(tourController.getTour);

module.exports = router;
