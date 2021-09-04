const express = require("express");

module.exports = ({ customerController, authentication }) => {
  const router = express.Router();

  router.get("/:id", customerController.show);
  router.get("/", customerController.index);
  router.put("/:id", authentication.verify, customerController.update);
  router.get("/:id/rooms", customerController.rooms);
  router.get("/:id/recommended", authentication.verify, customerController.recommendedRooms);

  return router;
};