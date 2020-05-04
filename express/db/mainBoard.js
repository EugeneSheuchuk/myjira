const mongoose = require('mongoose');

const mainBoardSchema = new mongoose.Schema({
  name: String,
});

const MainBoard = mongoose.model('mainBoard', mainBoardSchema);

module.exports = MainBoard;