const mongoose = require("mongoose");

const Board = mongoose.model(
  "Board",
  new mongoose.Schema({
    userId: {type:String,required:false},
    name: String,
    netWorthData: {type:Object,required:false}
  })
);

module.exports = Board;