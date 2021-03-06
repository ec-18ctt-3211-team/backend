const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
    {
        titles: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        room_id: {
            type: mongoose.Types.ObjectId,
            default: null,
        },
        thumnail: {
            type: String,
            required: true,
            default: "/no-thumnail.jpeg",
        },
        is_pinned: {
            type: Boolean,
            required: true,
            default: false,
        },
    }
);

module.exports = mongoose.model("City", citySchema);
