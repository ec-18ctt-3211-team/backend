const express = require("express");

module.exports = ({ authController }) => {
  const router = express.Router();

  router.post("/register", authController.register);

  return router;
};
