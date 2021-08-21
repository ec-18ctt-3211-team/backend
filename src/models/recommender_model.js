const mongoose = require("mongoose");

const optionsSchema = mongoose.Schema({
  maxVectorSize: {
    type: Number,
    required: true
  },
  maxSimilarDocuments: {
    type: Number,
    required: true
  },
  minScore: {
    type: Number,
    required: true
  },
  debug: {
    type: Boolean,
    required: true,
    default: false
  }
})

const similarDataSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})

const recommenderSchema = mongoose.Schema({
  options: {
    type: optionsSchema,
    required: true
  },
  data: {
    type: Map,
    of: [similarDataSchema]
  }
})

module.exports = mongoose.model("Recommender", recommenderSchema);
