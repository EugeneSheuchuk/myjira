import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BoardType, TaskType } from './types/boardReducerTypes';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8000/',
  // withCredentials: true,
};

const axiosInstance = axios.create(config);

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
  getBoards: () => Promise<AxiosResponse>;
  addNewBoard: (boardName: string) => Promise<AxiosResponse>;
  // addNewTask: (boardId: number, taskText: string) => Promise<boolean>;
  addNewTask: (boardId: number, taskText: string) => Promise<AxiosResponse>;
  saveNewBoardText: (boardId: number, boardName: string) => Promise<AxiosResponse>;
  deleteBoard: (boardId: number) => Promise<AxiosResponse>;
  deleteTask: (boardId: number, taskId: number) => Promise<boolean>;
  moveTask: (
    boardId: number,
    taskId: number,
    direction: 'top' | 'bottom'
  ) => Promise<boolean>;
}

const API: IAPI = {
  getBoards() {
    return axiosInstance.get('boards');
  },
  addNewBoard(boardName) {
    return axiosInstance.post('boards', { boardName });
  },
  // addNewTask(boardId, task) {
  //   let isAddTask = false;
  //   boards.forEach((item) => {
  //     if (item.id === boardId) {
  //       item.tasks.push({ taskId, taskText: task });
  //       taskId += 1;
  //       isAddTask = true;
  //     }
  //   });
  //   return Promise.resolve(isAddTask);
  // },
  addNewTask(boardId, taskText) {
    return axiosInstance.post('tasks', { boardId, taskText });
  },
  saveNewBoardText(boardId, newBoardName) {
    return axiosInstance.put('boards', { boardId, newBoardName });
  },
  deleteBoard(boardId) {
    return axiosInstance.delete('boards', { data:{ boardId } });
  },
  deleteTask(boardId, taskId) {
    boards.forEach((item) => {
      if (item.id === boardId) {
        // eslint-disable-next-line
        item.tasks = item.tasks.filter((el) => el.taskId !== taskId);
      }
    });
    return Promise.resolve(true);
  },
  moveTask(boardId, taskId, direction) {
    let current: TaskType;
    boards.forEach((item) => {
      if (item.id === boardId) {
        const result = item.tasks.filter((el) => {
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
  },
};

export default API;
