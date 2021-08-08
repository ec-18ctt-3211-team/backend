const express = require("express");

module.exports = ({ orderController }) => {
    const router = express.Router();

    router.post("/", orderController.create);
    router.get("/:host_id", orderController.index);
    router.put("/:id", orderController.update);

    return router;
};
