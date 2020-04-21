export type Task = {
  taskId: number;
  taskText: string;
};
export type BoardType = {
  id: number;
  boardName: string;
  tasks: Array<Task>;
};
export type Boards = {
  boards: Array<BoardType>;
};
