import { BoardType, TaskType } from './types/boardReducerTypes';

let id: number = 3;
let taskId: number = 0;

let boards: Array<BoardType> = [
  {
    id: 0,
    boardName: 'TO DO',
    tasks: [],
  },
  {
    id: 1,
    boardName: 'IN PROGRESS',
    tasks: [],
  },
  {
    id: 2,
    boardName: 'DONE',
    tasks: [],
  },
];
// Is it necessary to describe what the function returns? And if promis returns an error?
interface IAPI {
  getBoards: () => Promise<Array<BoardType>>;
  addNewBoard: (boardName: string) => Promise<boolean>;
  addNewTask: (boardId: number, taskText: string) => Promise<boolean>;
  saveNewBoardText: (boardId: number, boardName: string) => Promise<boolean>;
  deleteBoard: (boardId: number) => Promise<boolean>;
  deleteTask: (boardId: number, taskId: number) => Promise<boolean>;
  moveTask: (boardId: number, taskId: number, direction: 'top' | 'bottom') => Promise<boolean>;
}

const API: IAPI = {
  getBoards() {
    return Promise.resolve(boards);
  },
  addNewBoard(boardName) {
    boards.push({
      id,
      boardName,
      tasks: [],
    });
    id += 1;
    return Promise.resolve(true);
  },
  addNewTask(boardId, task) {
    let isAddTask = false;
    boards.forEach((item) => {
      if (item.id === boardId) {
        item.tasks.push({ taskId, taskText: task });
        taskId += 1;
        isAddTask = true;
      }
    });
    return Promise.resolve(isAddTask);
  },
  saveNewBoardText(boardId, newBoardName) {
    boards.forEach((item) => {
      if (item.id === boardId) {
        // eslint-disable-next-line
        item.boardName = newBoardName;
      }
    });
    return Promise.resolve(true);
  },
  deleteBoard(boardId) {
    boards = boards.filter((item) => item.id !== boardId);
    return Promise.resolve(true);
  },
  deleteTask(boardId, taskId) {
    boards.forEach((item) => {
      if (item.id === boardId) {
        // eslint-disable-next-line
        item.tasks = item.tasks.filter( el => el.taskId !== taskId);
      }
    });
    return Promise.resolve(true);
  },
  moveTask(boardId, taskId, direction) {
    let current: TaskType;
    boards.forEach((item) => {
      if (item.id === boardId) {
        const result = item.tasks.filter( el => {
          if (el.taskId !== taskId) return true;
          current = el;
          return false;
        });
        if (direction === 'top') {
          item.tasks = [current, ...result];
        } else {
          item.tasks = [...result, current];
        }
      }
    });
    return Promise.resolve(true);
  }
};

export default API;
