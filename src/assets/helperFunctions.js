function convertDataToCorrectString(data) {
  return data < 10 ? `0${data}` : `${data}`;
}

export function sortBoardTasks(a, b) {
  if ( a.position > b.position ) return 1;
  if ( a.position < b.position ) return -1;
  return 0;
}

export function getCurrentDateAsString(ms) {
  const date = new Date(ms);
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
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = convertDataToCorrectString(date.getHours());
  const min = convertDataToCorrectString(date.getMinutes());
  return `${month} ${day}, ${year}, ${hours}:${min}`;
}

export function calculateNewTasksPositions(
  boards,
  startBoardId,
  endBoardId,
  taskId,
  oldPosition,
  newPosition,
) {
  let copyBoards;
  let updateTasks;
  const tasks = [...boards.find(item => item.id === endBoardId).tasks];
  if ( startBoardId.toString() === endBoardId.toString() ) {
    if ( oldPosition > newPosition ) {
      updateTasks = tasks.map(item => {
        const updateItem = { ...item };
        if ( item.taskId.toString() === taskId.toString() ) {
          updateItem.position = newPosition;
        } else if ( item.position < oldPosition && item.position >= newPosition ) {
          updateItem.position += 1;
        }
        return updateItem;
      });
    } else {
      updateTasks = tasks.map(item => {
        const updateItem = item;
        if ( item.taskId.toString() === taskId.toString() ) {
          updateItem.position = newPosition;
        } else if (item.position >= oldPosition && item.position <= newPosition) {
          updateItem.position -= 1;
        }
        return updateItem;
      });
    }
    copyBoards = boards.map(board => {
      if (board.id === endBoardId) {
        return { ...board, tasks: updateTasks };
      }
      return board;
    });
  }
  // else {
  //   await this.decreaseOldBoardTaskPosition(startBoardId, oldPosition);
  //   const tasks = await Task.find({ boardId: endBoardId });
  //   const promises = [];
  //   tasks.forEach(item => {
  //     if ( item.position >= newPosition ) {
  //       item.position += 1;
  //       promises.push(item.save());
  //     }
  //   });
  //   await Promise.all(promises);
  //   await Task.updateOne({ _id: taskId }, { boardId: endBoardId, position: newPosition });
  //   return true;
  //
  // }
  return copyBoards;
}


