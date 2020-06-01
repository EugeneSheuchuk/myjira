import * as Types from './types';

export type TaskType = {
  taskId: string;
  taskText: string;
  position: number;
  taskDescription: string;
  createTime: number;
  updateTime: number;
  taskComments: Array<Types.TaskCommentType>;
};
export type BoardType = {
  id: string;
  boardName: string;
  tasks: Array<TaskType>;
};
export type Boards = {
  boards: Array<BoardType>;
};
