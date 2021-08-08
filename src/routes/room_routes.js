const express = require("express");

module.exports = ({ roomController }) => {
  const router = express.Router();
  router.get("/", roomController.index);
  router.get("/:id", roomController.show);
  return router;
};
