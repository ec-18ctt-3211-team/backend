const express = require("express");

module.exports = ({ customerController }) => {
    const router = express.Router();

    router.get("/:id", customerController.getCustomer);
    router.get("/", customerController.getAllCustomer);
    router.put("/:id", customerController.updateCustomer);

    return router;
};