const mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
    discountPrice: {
        type: Number,
        require: true,
    },
    orderId: {
        type: mongoose.Types.ObjectId,
        require: true,
        default: null,
    },
    deleteAt: {
        type: Date,
        default: null,
    },
    description: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Discount", discountSchema);