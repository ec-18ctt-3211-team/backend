const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  room_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  host_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  customer_id: {
    type: mongoose.Types.ObjectId,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  payment_number: {
    type: String,
    required: true,
  },
  num_adult: {
    type: Number,
    required: true,
  },
  num_kid: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
  },
  day_start: {
    type: String,
    required: true
  },
  day_end: {
    type: String,
    required: String
  },
  created_at: {
    type: String,
    required: true
  },
  deleted_at: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);