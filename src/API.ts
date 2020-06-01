import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BoardType } from './types/boardReducerTypes';
import { EditTaskDataType } from './types/types';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8000/',
  // withCredentials: true,
};

const axiosInstance = axios.create(config);

export enum SortTasks {
  'TOP' = 'TOP',
  'BOTTOM' = 'BOTTOM',
}

interface IAPI {
  getBoards: () => Promise<AxiosResponse>;
  addNewBoard: (boardName: string) => Promise<AxiosResponse>;
  addNewTask: (boardId: string, taskText: string) => Promise<AxiosResponse>;
  saveNewBoardText: (boardId: string, boardName: string) => Promise<AxiosResponse>;
  deleteBoard: (boardId: string) => Promise<AxiosResponse>;
  deleteTask: (taskId: string) => Promise<AxiosResponse>;
  moveTask: (
    boardId: string,
    taskId: string,
    direction: SortTasks,
    position: number
  ) => Promise<AxiosResponse>;
  changeTaskData: (taskId: string, taskData: EditTaskDataType) => Promise<AxiosResponse>;
}

const API: IAPI = {
  getBoards(): Promise<AxiosResponse<Array<BoardType>>> {
    return axiosInstance.get('boards');
  },
  addNewBoard(boardName: string): Promise<AxiosResponse<boolean>> {
    return axiosInstance.post('boards', { boardName });
  },
  addNewTask(boardId: string, taskText: string): Promise<AxiosResponse<boolean>> {
    return axiosInstance.post('tasks', { boardId, taskText });
  },
  saveNewBoardText(boardId: string, newBoardName: string): Promise<AxiosResponse<boolean>> {
    return axiosInstance.put('boards', { boardId, newBoardName });
  },
  deleteBoard(boardId: string): Promise<AxiosResponse<boolean>> {
    return axiosInstance.delete('boards', { data: { boardId } });
  },
  deleteTask(taskId: string): Promise<AxiosResponse<boolean>> {
    return axiosInstance.delete('tasks', { data: { taskId } });
  },
  moveTask(
    boardId: string,
    taskId: string,
    direction: SortTasks,
    position: number
  ): Promise<AxiosResponse<boolean>> {
    return axiosInstance.put('tasks/sort', { boardId, taskId, direction, position });
  },
  changeTaskData(taskId: string, taskData: EditTaskDataType): Promise<AxiosResponse<boolean>> {
    return axiosInstance.put('tasks', { taskId, taskData });
  },
};

export default API;
