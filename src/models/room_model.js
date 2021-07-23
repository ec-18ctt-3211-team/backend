const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const roomSchema = mongoose.Schema({
  host_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  description: {
    type: String,
  },
  created_at: {
    type: String,
    required: true,
    default: new Date().toString().substring(0, 21),
  },
  normal_price: {
    type: Number,
    required: true,
  },
  weekend_price: {
    type: Number,
    required: true,
  },
  deleted_at: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  max_guest: {
    type: Number,
    required: true,
  },
  thumnail: {
    type: String,
    required: true,
    default: "/no-thumnail.jpeg",
  },
});

module.exports = mongoose.model("Room", roomSchema);
