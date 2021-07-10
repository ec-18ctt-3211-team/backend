const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  room_id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Photo", photoSchema);
