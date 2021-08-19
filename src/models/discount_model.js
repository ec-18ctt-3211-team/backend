const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
    discount_price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    is_pinned: {
        type: Boolean,
        required: true,
        default: false,
    },
    thumnail: {
        type: String,
        required: true,
        default: "/no-thumnail.jpeg",
    }
});

module.exports = mongoose.model("Discount", discountSchema);
