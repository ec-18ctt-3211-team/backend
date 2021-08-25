const mongoose = require("mongoose");

const lastChoiceSchema = mongoose.Schema({
  customer_id: {
      type: mongoose.Types.ObjectId,
      required: true
  },
  room_id: {
      type: mongoose.Types.ObjectId,
      required: true
  }
});

module.exports = mongoose.model("Last choice", lastChoiceSchema);
