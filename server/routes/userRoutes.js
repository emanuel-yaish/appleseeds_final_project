const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(userController.getAllAccounts)
  .post(userController.addAccount);

router
  .route("/:userid")
  .get(userController.getUser)
  .put(userController.handleAccountAction);

module.exports = router;
