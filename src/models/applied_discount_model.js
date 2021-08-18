const mongoose = require("mongoose");

const appliedDiscountSchema = mongoose.Schema({
    customer_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    discount_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
});

module.exports = mongoose.model("Applied discount", appliedDiscountSchema);
