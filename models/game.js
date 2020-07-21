const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  creator: {
    steamid: String,
    name: String,
    pfp: String,
    items: Array,
    item_value: Number,
    trade_url: String
  },
  gameInfo: {
    flip_value: Number,
    flip_coin: String,
    client_seed: String,
    status: String,
    flip_creation: String,
    hashed_server_seed: String,
    nonce: Number,
    server_seed: String,
    result: Number
  },
  opponent: {
    joined: String,
    steamid: String,
    name: String,
    pfp: String,
    item_value: String,
    items: Array,
    trade_url: String
  }
});

module.exports = mongoose.model("Games", gameSchema)
