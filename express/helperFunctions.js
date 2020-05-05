module.exports = {
  transformBoard(board, tasks) {
    return {
      id: board._id,
      boardName: board.boardName,
      tasks: this.transformTasks(tasks),
    }
  },
  transformTasks(tasks) {
    return tasks.map(task => {
      return {
        taskId: task._id,
        taskText: task.taskText,
      }
    });
  }
};
