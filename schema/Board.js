const mongoose = require("mongoose");

const Board = mongoose.model(
  "Board",
  new mongoose.Schema({
    userId: String,
    name: String,
  })
);

module.exports = Board;