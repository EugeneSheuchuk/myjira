import * as ACTIONS from './actionTypes.js';

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

const initialState: Boards = {
  boards: [],
};

const boardReducer = (state = initialState, action: any): Boards => {
  switch (action.type) {
    case ACTIONS.BOARDREDUCER_SET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    default:
      return state;
  }
};

export default boardReducer;
