const express = require("express");

module.exports = ({ customerController, authentication }) => {
  const router = express.Router();

  router.get("/:id", authentication.verify, customerController.show);
  router.get("/", customerController.index);
  router.put("/:id", authentication.verify, customerController.update);
  router.get("/:id/rooms", authentication.verify, customerController.rooms);
  router.get("/:id/recommended", authentication.verify, customerController.recommendedRooms);

  return router;
};
