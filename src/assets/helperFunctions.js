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
        } else if ( item.position >= oldPosition && item.position <= newPosition ) {
          updateItem.position -= 1;
        }
        return updateItem;
      });
    }
    copyBoards = boards.map(board => {
      if ( board.id === endBoardId ) {
        return { ...board, tasks: updateTasks };
      }
      return board;
    });
  } else {
    const draggableTask = boards.find(item => item.id === startBoardId)
      .tasks.find(task => task.taskId === taskId);
    draggableTask.position = newPosition;
    const updateNewTasks = tasks.map(task => {
      if ( task.position >= newPosition ) {
        return {
          ...task,
          position: task.position + 1,
        };
      }
      return task;
    });
    updateNewTasks.push(draggableTask);
    copyBoards = boards.map(board => {
      if ( board.id === startBoardId ) {
        return {
          ...board, tasks: board.tasks.map(task => {
            if ( task.position > oldPosition ) {
              return {
                ...task,
                position: task.position - 1,
              };
            }
            return task;
          }).filter(task => task.taskId !== taskId),
        };
      }
      if (board.id === endBoardId) {
        return {
          ...board,
          tasks: updateNewTasks,
        };
      }
      return board;
    });
  }
  return copyBoards;
}
