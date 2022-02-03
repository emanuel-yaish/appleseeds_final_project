const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    unique: true,
  },
  email: {
    type: String,
    unique: [true, "Email cannot be empty"],
  },
  password: {
    type: String,
    unique: [true, "password cannot be empty"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  likedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dislikedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  eventsAttended: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
