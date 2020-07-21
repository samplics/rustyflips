const mongoose = require("mongoose");

const infoSchema = mongoose.Schema({
  recent_flips: Array,
  total_amount: Number,
  active_games: Number
});

module.exports = mongoose.model("Info", infoSchema)
