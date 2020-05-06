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
  },
  async addBoard(boardName) {
    try {
      let boardId = await MainBoard.findOne({ name: 'mygira' });
      if ( boardId ) {
        const board = new Board({ boardName, mainBoardId: boardId._id });
        await board.save();
        return true;
      }
      return false;
    } catch (e) {

    }
  },
  async deleteBoard(boardId) {
    try {
      await Task.deleteMany({ boardId });
      await Board.findOneAndDelete({ _id: boardId });
      return true;
    } catch (e) {
      return false;
    }
  },
  async changeBoardName(boarId, newBoardName) {
    try {
      await Board.updateOne({ _id: boarId }, { boardName: newBoardName });
      return true;
    } catch (e) {
      return false;
    }
  },
  async addNewTask(boardId, taskText) {
    try {
      const tasks = await Task.find({ boardId });
      const task = new Task({ taskText, boardId, position: tasks.length });
      await task.save();
      return true;
    } catch (e) {
      return false;
    }
  },
  async deleteTask(taskId) {
    try {
      await Task.findOneAndDelete({ _id: taskId });
      return true;
    } catch (e) {
      return false;
    }
  },
  async sortBoardTasks(boardId, taskId, direction, position) {
    try {
      const tasks = await Task.find({ boardId });
      const promises = tasks.map(item => {
        if ( direction === 'top' ) {
          if ( item.position < position && item._id !== taskId ) {
            item.position = item.position + 1;
            return item.save();
          } else if ( item.position === position ) {
            item.position = 0;
            return item.save();
          }
        } else if ( direction === 'bottom' ) {
          if ( item.position > position && item._id !== taskId ) {
            item.position = item.position - 1;
            return item.save();
          } else if ( item.position === position ) {
            item.position = tasks.length - 1;
            return item.save();
          }
        }
      });
      await Promise.all(promises);
      return true;
    } catch (e) {
      return false;
    }
  }
};