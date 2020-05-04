const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  boardName: String,
  mainBoardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainBoard'
  }
});

const Board = mongoose.model('boards', boardSchema);

module.exports = Board;