const mongoose = require('mongoose');

const mainBoardSchema = new mongoose.Schema({
  name: String,
}, {autoIndex: false, versionKey: false});

const MainBoard = mongoose.model('mainBoard', mainBoardSchema);

module.exports = MainBoard;