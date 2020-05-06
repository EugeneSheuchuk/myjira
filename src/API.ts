import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8000/'
  // withCredentials: true,
};

const axiosInstance = axios.create(config);

interface IAPI {
  getBoards: () => Promise<AxiosResponse>;
  addNewBoard: (boardName: string) => Promise<AxiosResponse>;
  addNewTask: (boardId: number, taskText: string) => Promise<AxiosResponse>;
  saveNewBoardText: (boardId: number, boardName: string) => Promise<AxiosResponse>;
  deleteBoard: (boardId: number) => Promise<AxiosResponse>;
  deleteTask: (taskId: number) => Promise<AxiosResponse>;
  moveTask: (
    boardId: number,
    taskId: number,
    direction: 'top' | 'bottom',
    position: number
  ) => Promise<AxiosResponse>;
}

const API: IAPI = {
  getBoards() {
    return axiosInstance.get('boards');
  },
  addNewBoard(boardName) {
    return axiosInstance.post('boards', { boardName });
  },
  addNewTask(boardId, taskText) {
    return axiosInstance.post('tasks', { boardId, taskText });
  },
  saveNewBoardText(boardId, newBoardName) {
    return axiosInstance.put('boards', { boardId, newBoardName });
  },
  deleteBoard(boardId) {
    return axiosInstance.delete('boards', { data: { boardId } });
  },
  deleteTask(taskId) {
    return axiosInstance.delete('tasks', { data: { taskId } });
  },
  moveTask(boardId, taskId, direction, position) {
    return axiosInstance.put('tasks/sort',
      { boardId, taskId, direction, position });
  }
};

export default API;
