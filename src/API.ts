import { BoardType, Task } from './types/boardReducerTypes';

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
  addNewTask: (id: number, taskText: string) => Promise<boolean>;
  getBoardTasks: (id: number) => Promise<Array<Task>>
}

const API: IAPI = {
  getBoards() {
    return Promise.resolve(boards);
  },
  addNewTask(id, task) {
    let isAddTask = false;
      boards.forEach(item => {
        if (item.id === id) {
          item.tasks.push({ taskId: taskId, taskText: task});
          taskId += 1;
          isAddTask = true;
        }
      });
    return Promise.resolve(isAddTask);
  },
  getBoardTasks(id) {
    let tasks: Array<Task> = [];
    boards.forEach(item => {
      if (item.id === id) {
        tasks = item.tasks;
      }
    });
    return Promise.resolve(tasks);
  }
};

export default API;
