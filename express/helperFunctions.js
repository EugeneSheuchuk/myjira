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
        position: task.position,
        taskComment: task.taskComment,
      }
    });
  },
  getCurrentDateAsString() {
    const date = new Date();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const min = date.getMinutes();
    return `${month} ${day}, ${year}, ${hours}:${min}`;
  }
};
