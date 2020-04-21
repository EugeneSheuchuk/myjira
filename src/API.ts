import { BoardType } from './types/boardReducerTypes';

const boards: Array<BoardType> = [
  {
    boardName: 'TO DO',
    tasks: [],
  },
  {
    boardName: 'IN PROGRESS',
    tasks: [],
  },
  {
    boardName: 'DONE',
    tasks: [],
  },
];
// Is it necessary to describe what the function returns? And if promis returns an error?
interface IAPI {
  getBoards: () => Promise<Array<BoardType>>;
}

const API: IAPI = {
  getBoards() {
    return Promise.resolve(boards);
  },
};

export default API;
