const express = require("express");

module.exports = ({ discountController }) => {
  const router = express.Router();

  router.get("/", discountController.index);
  router.get("/pinned", discountController.pinned);
  router.get("/customer/:id", discountController.customerId);
  router.get("/:id", discountController.show);
  router.post("/", discountController.create);
  router.post("/apply", discountController.apply);
  router.put("/:id", discountController.update);
  router.delete("/:id", discountController.delete);

  return router;
};
