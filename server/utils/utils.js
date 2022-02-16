const User = require("../models/userModel");

const getUserById = async (userid) => User.findOne({ _id: userid });

const updateUserById = async (filter, update) =>
  User.findOneAndUpdate(filter, update, { new: true });

const uncaughtException = (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
};

const unhandledRejection = (err, server) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
};

module.exports = {
  getUserById,
  updateUserById,
  uncaughtException,
  unhandledRejection,
};
