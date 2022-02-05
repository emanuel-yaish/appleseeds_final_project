const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

router
  .route("")
  .get(eventController.getAllEvents)
  .post(eventController.addEvent);

router
  .route("/:eventid")
  .get(eventController.getEvent)
  .put(eventController.updateEvent);

module.exports = router;
