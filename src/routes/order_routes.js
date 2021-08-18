const express = require("express");

module.exports = ({ orderController }) => {
    const router = express.Router();

    router.post("/", orderController.create);
    router.get("/host/:id", orderController.index);
    router.get("/customer/:id", orderController.indexCustomer);
    router.put("/:id", orderController.update);

    return router;
};
