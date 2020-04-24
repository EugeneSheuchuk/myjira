import * as ACTIONS from './actionTypes';
import { BoardReducerActionsType } from './actions';
import { Boards } from '../types/boardReducerTypes';

const initialState: Boards = {
  boards: [],
};

const boardReducer = (
  state = initialState,
  action: BoardReducerActionsType
): Boards => {
  switch (action.type) {
    case ACTIONS.BOARDREDUCER_SET_BOARDS:
      return {
        ...state,
        boards: [...action.payload],
      };
    default:
      return state;
  }
};

export default boardReducer;
