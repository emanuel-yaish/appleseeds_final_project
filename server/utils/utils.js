const User = require("../models/userModel");

const getUserById = async (userid) => User.findOne({ _id: userid });

const updateUserById = async (filter, update) =>
  User.findOneAndUpdate(filter, update, { new: true });

module.exports = { getUserById, updateUserById };
