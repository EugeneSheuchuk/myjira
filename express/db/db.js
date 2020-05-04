const mongoose = require('mongoose');
const MainBoard = require('./mainBoard');
const Board = require('./board');

module.exports = {
  connectDBOffline() {
    return mongoose.connect('mongodb://localhost:27017/myjira',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  },
  connectDBOnline() {
    return mongoose.connect('mongodb+srv://ToDoListUser:ToDoListUser@todolistproject-pjhmb.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  },
  async getBoards() {
    try {
      let boardId = await MainBoard.findOne({name: 'mygira'});
      if (!boardId) {
        const mainBoard = new MainBoard({name: 'mygira'});
        await mainBoard.save();
        boardId = await MainBoard.findOne({name: 'mygira'});
        const startBoards = ['TO DO', 'IN PROGRESS', 'DONE'];
        const promises = startBoards.map(item => {
          const board = new Board({boardName: item, mainBoardId: boardId._id});
          return board.save();
        });
        return Promise.all(promises);
      } else {
        return Board.find({mainBoardId: boardId._id});
      }

    } catch (e) {
      
    }
  }
};