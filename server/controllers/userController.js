const User = require("../models/userModel");
const AppError = require("../utils/appError");
// to check if where to use it if it is service
const { getUserById, updateUserById } = require("../utils/utils");
const catchAsync = require("./../utils/catchAsync");

// update object without neseted objects
const updateObj = async (obj, userid) => {
  const filterObj = {};
  let allowedFields = Object.keys(User.schema.tree);

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      let keyName = el;
      filterObj[keyName] = obj[el];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(userid, filterObj, {
    new: true,
  });
  return updateUser;
};

// update nested objects
const updateNestedObj = async (obj, userid, nestedFiledName) => {
  console.log("obj", obj);
  const filterObj = {};
  let allowedFields = Object.keys(User.schema.tree[nestedFiledName]);

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      let keyName = `${nestedFiledName}.${el}`;
      filterObj[keyName] = obj[el];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(
    userid,
    { $set: filterObj },
    { new: true }
  );

  return updatedUser;
};

// update
const checkAndHandleMatch = async (userid, likedUserid) => {
  console.log("check match", userid);
  const likedUser = await User.findById({ _id: likedUserid });

  if (likedUser.likedUsers.includes(userid)) {
    console.log("match");
    const matchid = new Date().valueOf();
    const likedUseridMatch = {
      userid: userid,
      matchid: matchid,
    };

    updateObj({ match: likedUseridMatch }, likedUserid);
    return {
      match: {
        userid: likedUserid,
        matchid: matchid,
      },
    };
  }

  return {};
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
  // prevent from user update the password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password. Please use /updatePassword",
        400
      )
    );
  }
  //
  const { likedUsers, personalInfo, preferences } = req.body;
  const userid = req.params.userid;
  let updatedUser = "";

  console.log(req.body);

  if (personalInfo || preferences) {
    const nestedFiledName = personalInfo ? "personalInfo" : "preferences";
    const nestedFiledValue = personalInfo ? personalInfo : preferences;

    updatedUser = await updateNestedObj(
      nestedFiledValue,
      userid,
      nestedFiledName
    );
  } else {
    const updateData = req.body;

    if (likedUsers) {
      const match = await checkAndHandleMatch(userid, likedUsers.pop());
      updateData.match = match;
    }
    console.log(updateData);
    updatedUser = await updateObj(updateData, userid);
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
