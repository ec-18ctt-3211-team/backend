const express = require("express");

module.exports = ({ cityController }) => {
    const router = express.Router();
    router.post("/", cityController.create);
    router.get("/", cityController.index);
    router.get("/pinned", cityController.indexPinned);
    router.get("/:id", cityController.show);
    router.put("/:id", cityController.update);
    return router;
};
