const express = require("express");
const tourController = require("./../controllers/toursController");
const router = express.Router();

router.get("/", tourController.getAllTours).post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour);

module.exports = router;
