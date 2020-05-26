export type TaskType = {
  taskId: string;
  taskText: string;
  position: number;
  taskComment: string;
};
export type BoardType = {
  id: string;
  boardName: string;
  tasks: Array<TaskType>;
};
export type Boards = {
  boards: Array<BoardType>;
};
