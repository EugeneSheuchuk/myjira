const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  boardName: String,
  mainBoardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainBoard'
  }
}, {autoIndex: false, versionKey: false});

const Board = mongoose.model('boards', boardSchema);

module.exports = Board;