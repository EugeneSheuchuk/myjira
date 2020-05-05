const mongoose = require('mongoose');
const Board = require('./board');
const MainBoard = require('./mainBoard');
const Task = require('./task');
const helperFunctions = require('./../helperFunctions');


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
  async initialBoards() {
    try {
      const mainBoard = new MainBoard({ name: 'mygira' });
      await mainBoard.save();
      const mainBoardObj = await MainBoard.findOne({ name: 'mygira' });
      const startBoards = ['TO DO', 'IN PROGRESS', 'DONE'];
      const promises = startBoards.map(item => {
        const board = new Board(
          {
            boardName: item,
            mainBoardId: mainBoardObj._id
          }
        );
        return board.save();
      });
      return Promise.all(promises);
    } catch (e) {

    }
  },
  async getBoardsTasks(boards) {
    const promises = boards.map(item => {
      return Task.find({ boardId: item._id });
    });
    return Promise.all(promises);
  },
  async getBoards() {
    try {
      let boardId = await MainBoard.findOne({ name: 'mygira' });
      if ( !boardId ) {
        const boards = await this.initialBoards();
        const tasks = await this.getBoardsTasks(boards);
        return boards.map((board, index) => {
          return helperFunctions.transformBoard(board, tasks[index]);
        });
      } else {
        const boards = await Board.find({ mainBoardId: boardId.id });
        const tasks = await this.getBoardsTasks(boards);
        return boards.map((board, index) => {
          return helperFunctions.transformBoard(board, tasks[index]);
        });
      }
    } catch (e) {

    }
  }
};