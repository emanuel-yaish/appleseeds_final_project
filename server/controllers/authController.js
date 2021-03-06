const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).send({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    next(new AppError("please provide email and password!", 400));
  }
  // 2) Check if user exist && password is correct
  const user = await User.findOne({ email }).select("+password");

  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything of, send token to client
  const token = signToken(user._id);
  res.status(200).send({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

module.exports = {
  signup,
  signin,
};
