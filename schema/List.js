const mongoose = require("mongoose");

const List = mongoose.model(
  "List",
  new mongoose.Schema({
    boardId: String,
    name: String,
    position: Number,
    hideChildren:Boolean,
    colNum: Number,

  })
);

module.exports = List;