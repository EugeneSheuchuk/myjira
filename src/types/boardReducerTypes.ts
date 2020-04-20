type Task = {
  taskName: string;
};
export type BoardType = {
  boardName: string;
  tasks: Array<Task>;
};
export type Boards = {
  boards: Array<BoardType>;
};
