require("dotenv").config();
const express = require("express");
const cors = require("cors");
const AppError = require("./utils/appError");
const socketIo = require("socket.io");
const http = require("http");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const app = express();
const path = require("path");

const ioCorsConfig = {
  cors: {
    origin: ["http://localhost:3000", "https://localhost:3000"],
    method: ["POST", "GET", "PUT"],
  },
};

const server = http.createServer(app);
const io = socketIo(server, ioCorsConfig); // you can change the cors to your own domain

const handleSocketIo = (req, res, next) => {
  req.io = io;
  return next();
};

const publicPath = path.join(__dirname, "../client/build");
app.use(express.static(publicPath));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(handleSocketIo);

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = server;
