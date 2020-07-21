const mongoose = require("mongoose");

const priceSchema = mongoose.Schema({
  market_hash_name: String,
  unstable: String,
  nameID: String,
  safe_price: Number,
  avg_price: Number,
  min_price: Number,
  max_price: Number,
  amt_sold: Number,
  item_image: String
});

module.exports = mongoose.model("Prices", priceSchema)
