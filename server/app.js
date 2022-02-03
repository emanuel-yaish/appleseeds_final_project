require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bankRouter = require("./routes/bankRoutes");
const accountRouter = require("./routes/accountRoutes");
const app = express();
const path = require("path");

const publicPath = path.join(__dirname, "../client/build");
app.use(express.static(publicPath));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/bank", bankRouter);
app.use("/accounts", accountRouter);

app.get("*", (req, res) => {
  res.sendFile(publicPath);
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
