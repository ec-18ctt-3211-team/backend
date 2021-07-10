const mongoose = require("mongoose");

const bookingDateSchema = mongoose.Schema({
  room_id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Booking date", bookingDateSchema);
