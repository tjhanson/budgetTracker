const mongoose = require("mongoose");

const Card = mongoose.model(
  "Card",
  new mongoose.Schema({
    listId: String,
    name: String,
    position: Number,
    amount:Number,

  })
);

module.exports = Card;