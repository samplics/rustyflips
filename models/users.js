const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  steamid: String,
  username: String,
  profile_url: String,
  avatar: String,
  trade_url: String,
  client_seed: String,
  times_bet: Number,
  times_won: Number,
  total_deposited: Number,
  total_won: Number,
  profit: Number,
  register_date: String,
  past_flips: Array
});

module.exports = mongoose.model("Users", userSchema)
