require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const app = express();
const path = require("path");

const publicPath = path.join(__dirname, "../client/build");
app.use(express.static(publicPath));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next();
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.status).send({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
