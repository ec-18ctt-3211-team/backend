const express = require("express");

module.exports = ({ cityController, authentication }) => {
    const router = express.Router();
    router.post("/", authentication.verify, cityController.create);
    router.get("/", authentication.verify, cityController.index);
    router.get("/pinned", cityController.pinned);
    router.get("/:id", authentication.verify, cityController.show);
    router.put("/:id", authentication.verify, cityController.update);
    router.delete("/:id", authentication.verify, cityController.delete);
    return router;
};
