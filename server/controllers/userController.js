const User = require("../models/userModel");
const AppError = require("../utils/appError");
// to check if where to use it if it is service
const { getUserById, updateUserById } = require("../utils/utils");
const catchAsync = require("./../utils/catchAsync");

const filterObj = (obj, allowedFields) => {
  const filterObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      let keyName = `personalInfo.${el}`;
      filterObj[keyName] = obj[el];
    }
  });

  return filterObj;
};

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById({ _id: req.params.userid });
  if (!user) return next(new AppError("No User found with that ID", 404));

  res.status(200).send({
    status: "success",
    results: "User details:",
    data: {
      user,
    },
  });
});

const addUser = catchAsync(async (req, res, next) => {
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

const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password. Please use /updatePassword",
        400
      )
    );
  }

  let updatedUser = "";
  const { likedUsers, dislikedUsers } = req.body;

  if (likedUsers || dislikedUsers) {
    const updtelikes = likedUsers
      ? { likedUsers: req.body.likedUsers }
      : { dislikedUsers: req.body.dislikedUsers };

    updatedUser = await User.findByIdAndUpdate(req.params.userid, updtelikes, {
      new: true,
    });
  } else {
    // 2) Filtering out unwanted fields names that are not allowed to be updated
    // to do add preferences
    let allowedFields = Object.keys(User.schema.tree.personalInfo);
    // if (req.body.personalInfo) allowedFields = ;
    const filteredBody = filterObj(req.body, allowedFields);

    console.log("userid: ", req.params.userid);
    console.log(filteredBody);

    // 3) Update user document
    updatedUser = await User.findByIdAndUpdate(
      req.params.userid,
      { $set: filteredBody },
      { new: true }
    );
    // updateUserById({ _id: req.params.userid }, userUpdatedData);
  }

  res.status(200).json({
    status: "success",
    results: "Updated user details",
    data: {
      updatedUser,
    },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  await User.deleteOne({ _id: userid });

  res.status(200).json({
    status: "success",
    results: "user deleted",
  });
});
const getAllOnlineUsers = catchAsync(async (req, res, next) => {
  //todo change to only onlie
  // const users = await User.find({ isActive: true });
  const users = await User.find();

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
