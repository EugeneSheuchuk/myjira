export type TaskType = {
  taskId: string;
  taskText: string;
  position: number;
  taskComment: string;
  createTime: number;
  updateTime: number;
};
export type BoardType = {
  id: string;
  boardName: string;
  tasks: Array<TaskType>;
};
export type Boards = {
  boards: Array<BoardType>;
};
