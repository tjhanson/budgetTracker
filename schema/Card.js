const mongoose = require("mongoose");

const Card = mongoose.model(
  "Card",
  new mongoose.Schema({
    listId: String,
    name: String,
    members: Array,
    position: Number,
    description:String,
    dueDate: Date,

  })
);

module.exports = Card;