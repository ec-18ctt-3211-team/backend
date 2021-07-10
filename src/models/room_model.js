const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  host_id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  create_at: {
    type: String,
    required: true,
    default: new Date().toString().substring(0, 21)
  },
  normal_price: {
    type: Number,
    required: true
  },
  weekend_price: {
    type: Number,
    required: true
  },
  deleted_at: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Room", roomSchema);
