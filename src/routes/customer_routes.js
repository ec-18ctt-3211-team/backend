const express = require("express");

module.exports = ({ customerController }) => {
  const router = express.Router();

  router.get("/:id", customerController.show);
  router.get("/", customerController.index);
  router.put("/:id", customerController.update);
  router.get("/:id/rooms", customerController.rooms);

  return router;
};
