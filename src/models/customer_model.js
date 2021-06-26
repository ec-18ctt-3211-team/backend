const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  ava: {
    type: String,
    require: true,
    default: "/images/defaultAva.png",
  },
  is_host: {
    type: Boolean,
    require: true,
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
});

module.exports = mongoose.model("Customer", customerSchema);
