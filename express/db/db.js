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
      const task = new Task({
        taskText,
        boardId,
        position: tasks.length,
        taskDescription: '',
        createTime: new Date().getTime(),
        updateTime: 0,
        taskComments: [],
      });
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
        if ( direction === 'TOP' ) {
          if ( item.position < position && item._id !== taskId ) {
            item.position = item.position + 1;
            return item.save();
          } else if ( item.position === position ) {
            item.position = 0;
            return item.save();
          }
        } else if ( direction === 'BOTTOM' ) {
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
  },
  async changeTaskData(taskId, taskData) {
    try {
      const dbTaskData = await Task.findOne({ _id: taskId });
      if (dbTaskData.boardId === taskData.boardId) {
        await Task.updateOne({_id: taskId}, {...taskData, updateTime: new Date().getTime()});
        return true;
      }
      const oldTaskBoardId = dbTaskData.boardId;
      const oldTaskPosition = dbTaskData.position;
      const isIncreaseNewBoardTasksPosition = await this.increaseBoardTasksPosition(taskData.boardId);
      if (!isIncreaseNewBoardTasksPosition) return false;
      await Task.updateOne({_id: taskId},
        {
          ...taskData,
          updateTime: new Date().getTime(),
          position: 0 });
      return await this.decreaseOldBoardTaskPosition(oldTaskBoardId, oldTaskPosition);
    } catch (e) {
      return false;
    }
  },
  async increaseBoardTasksPosition(boardId) {
    try {
      const tasks = await Task.find({ boardId });
      const promises = tasks.map(item => {
        item.position += 1;
        return item.save();
      });
      await Promise.all(promises);
      return true;
    } catch (e) {
      return false;
    }
  },
  async decreaseOldBoardTaskPosition(boardId, taskPosition) {
    try {
      const tasks = await Task.find({ boardId });
      const promises = [];
      tasks.forEach(item => {
        if (item.position > taskPosition) {
          item.position -= 1;
          promises.push(item.save());
        }
      });
      await Promise.all(promises);
      return true;
    } catch (e) {
      return false;
    }
  },
  async moveTaskByDnD(startBoardId, endBoardId, taskId, oldPosition, newPosition) {
    try {
      if (startBoardId.toString() === endBoardId.toString()) {
        const tasks = await Task.find({ boardId: endBoardId });
        const promises = [];
        if (oldPosition > newPosition) {
          tasks.forEach(item => {
            if (item._id.toString() === taskId.toString()) {
              item.position = newPosition;
              promises.push(item.save());
            } else if (item.position <= oldPosition && item.position >= newPosition) {
              item.position += 1;
              promises.push(item.save());
            }
          });
        } else {
          tasks.forEach(item => {
            if (item._id.toString() === taskId.toString()) {
              item.position = newPosition;
              promises.push(item.save());
            } else if (item.position >= oldPosition && item.position <= newPosition) {
              item.position -= 1;
              promises.push(item.save());
            }
          });
        }
        await Promise.all(promises);
        return true;
      } else {
        await this.decreaseOldBoardTaskPosition(startBoardId, oldPosition);
        const tasks = await Task.find({ boardId: endBoardId });
        const promises = [];
        tasks.forEach(item => {
          if (item.position >= newPosition) {
            item.position += 1;
            promises.push(item.save());
          }
        });
        await Promise.all(promises);
        await Task.updateOne({_id: taskId}, {boardId: endBoardId, position: newPosition});
        return true;
      }
    } catch (e) {
      return false;
    }
  }
};