const express = require("express");

module.exports = ({ authController }) => {
  const router = express.Router();

  // Authentication
  router.post("/register", authController.register);

  // Customer
};
