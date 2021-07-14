const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
    discountPrice: {
        type: Number,
        required: true,
    },
    orderId: {
        type: mongoose.Types.ObjectId,
        default: null,
    },
    deleteAt: {
        type: Date,
        default: null,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Discount", discountSchema);