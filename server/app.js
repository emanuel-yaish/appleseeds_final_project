require("dotenv");
const express = require("express");
const cors = require("cors");
const AppError = require("./utils/appError");
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoutes");
const app = express();
const path = require("path");

dotenv.config({ path: "./config.env" });

const publicPath = path.join(__dirname, "../client/build");
app.use(express.static(publicPath));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
