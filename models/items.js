const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  market_hash_name: String,
  asset_id: String,
  context_id: String,
  og_owner_name: String,
  og_owner_steamid: String,
  og_owner_tradelink: String,
  recieved: String,
  bot_owner_steamid: String,
  bot_owner_number: Number,
  obtained_date: String,
});

module.exports = mongoose.model("Items", itemSchema)
