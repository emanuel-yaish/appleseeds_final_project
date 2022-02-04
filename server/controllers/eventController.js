const Event = require("../models/eventModel");
// to check if where to use it if it is service
const { getEventById, updateEventById } = require("../utils/utils");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const getEvent = catchAsync(async (req, res) => {
  const event = await Event.findOne({ _id: req.params.eventid });

  if (!event) {
    return next(new AppError("No event found with that ID", 404));
  }
  res.status(200).send({
    status: "success",
    results: "Event details:",
    data: {
      event,
    },
  });
});

const getAllEvents = catchAsync(async (req, res) => {
  const events = await Event.find();

  res.status(200).send({
    status: "success",
    results: events.length,
    data: {
      events,
    },
  });
});

const addEvent = catchAsync(async (req, res) => {
  // to do take only the wanted fileds
  const newEventFormData = req.body;
  const newEvent = await Event.create(newEventFormData);

  res.status(200).send({
    status: "success",
    results: "new event created",
    data: {
      newEvent,
    },
  });
});

const updateEvent = catchAsync(async (req, res) => {
  // to do take only the wanted fileds
  const eventUpdatedData = req.body;

  const event = await updateEventById({ _id: eventid }, eventUpdatedData);

  res.status(200).json({
    status: "success",
    results: "Updated event details",
    data: {
      event,
    },
  });
});
const deleteEvent = catchAsync(async (req, res) => {
  const event = await Event.deleteOne({ _id: eventid });

  if (!event) return next(new AppError("No event fount with that Id", 404));

  res.status(200).json({
    status: "success",
    results: "event deleted",
  });
});

module.exports = {
  getEvent,
  getAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
