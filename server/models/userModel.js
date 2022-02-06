const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
  },
  email: {
    type: String,
    required: [true, "please provide your email!"],
    unique: [true, "Email cannot be empty"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "password cannot be empty"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  eventsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

userSchema.pre("save", function (next) {
  // Only run this function if password was actualy modified
  if (!this.isModiried("password")) return next();

  // Hash the password with cost of 12
  this.password = bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
