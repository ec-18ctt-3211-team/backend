const mongoose = require("mongoose");

const extraPriceSchema = mongoose.Schema({
  room_id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Extra price", extraPriceSchema);
