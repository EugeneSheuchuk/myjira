import { IState } from './rootReducer';
import { BoardType } from '../types/boardReducerTypes';

export const getBoardsFromState = (state: IState): Array<BoardType> => {
  return state.board.boards;
};
