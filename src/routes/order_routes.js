const express = require("express");

module.exports = ({ orderController, authentication }) => {
    const router = express.Router();

    router.post("/", orderController.create);
    router.get("/host/:id", authentication.verify, orderController.index);
    router.get("/customer/:id", authentication.verify, orderController.indexCustomer);
    router.get("/:id", authentication.verify, orderController.show);
    router.put("/:id", authentication.verify, orderController.update);

    return router;
};
