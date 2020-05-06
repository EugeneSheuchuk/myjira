export type TaskType = {
  taskId: number;
  taskText: string;
  position: number;
};
export type BoardType = {
  id: number;
  boardName: string;
  tasks: Array<TaskType>;
};
export type Boards = {
  boards: Array<BoardType>;
};
