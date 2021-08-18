const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  ava: {
    type: String,
    required: true,
    default: "/defaultAva.png",
  },
  is_host: {
    type: Boolean,
    required: true,
    default: false,
  },
  payment_number: {
    type: String,
    default: null,
  },
  ci: {
    type: String,
    default: null,
  },
  email_paypal: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Customer", customerSchema);