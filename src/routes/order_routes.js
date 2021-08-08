const express = require("express");

module.exports = ({ orderController }) => {
    const router = express.Router();

    router.post("/create", orderController.create);
    router.post("/", orderController.index);

    return router;
};
