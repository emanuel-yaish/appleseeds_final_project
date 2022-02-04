const User = require("../models/userModel");
// to check if where to use it if it is service
const { getUserById, updateUserById } = require("../utils/utils");
const catchAsync = require("./../utils/catchAsync");

const getUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ _id: req.params.userid });

  if (!user)
    res.status(200).send({
      status: "success",
      results: "User details:",
      data: {
        user,
      },
    });
});

const addUser = catchAsync(async (req, res) => {
  // to do take only the wanted fileds
  const newUserFormData = req.body;
  const newUser = await User.create(newUserFormData);

  res.status(200).send({
    status: "success",
    results: "new user created",
    data: {
      newUser,
    },
  });
});

const updateUser = catchAsync(async (req, res) => {
  // to do take only the wanted fileds
  const userUpdatedData = req.body;

  const user = await updateUserById({ _id: userid }, userUpdatedData);

  res.status(200).json({
    status: "success",
    results: "Updated user details",
    data: {
      user,
    },
  });
});
const deleteUser = catchAsync(async (req, res) => {
  await User.deleteOne({ _id: userid });

  res.status(200).json({
    status: "success",
    results: "user deleted",
  });
});
const getAllOnlineUsers = catchAsync(async (req, res) => {
  const users = await Users.find({ isActive: true });

  res.status(200).send({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getAllOnlineUsers,
};
