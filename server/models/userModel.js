const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

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
  personalInfo: {
    name: {
      type: String,
      // required: [true, "Name cannot be empty"],
    },
    avatar: String,
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    birthday: Date,
    location: String,
    height: String,
    status: {
      type: String,
      enum: ["Single", "Divorced", "widowed"],
    },
    hobbies: [],
    about: String,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  eventsAttended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actualy modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

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
