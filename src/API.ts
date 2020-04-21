import { BoardType, TaskType } from './types/boardReducerTypes';

let id: number = 3;
let taskId: number = 0;

const boards: Array<BoardType> = [
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
  addNewTask: (boardId: number, taskText: string) => Promise<boolean>;
  getBoardTasks: (boardId: number) => Promise<Array<TaskType>>;
}

const API: IAPI = {
  getBoards() {
    return Promise.resolve(boards);
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
  getBoardTasks(boardId) {
    let tasks: Array<TaskType> = [];
    boards.forEach((item) => {
      if (item.id === boardId) {
        tasks = item.tasks;
      }
    });
    return Promise.resolve(tasks);
  },
};

export default API;
