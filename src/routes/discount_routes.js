const express = require("express");

module.exports = ({ discountController }) => {
    const router = express.Router();

    router.get("/", discountController.index);

    return router;
};