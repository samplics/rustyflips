const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  result: Number,
  server_seed: String,
  nonce: Number
});

module.exports = mongoose.model("Results", resultSchema)
