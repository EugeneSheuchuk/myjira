import * as ACTIONS from './actionTypes';
import { BoardTask } from './boardReducer';

type ActionSetBoards = {
    type: typeof ACTIONS.BOARDREDUCER_SET_BOARDS;
    payload: Array<BoardTask>;
}
export const setBoards = (): ActionSetBoards => (
    { type: ACTIONS.BOARDREDUCER_SET_BOARDS, payload: [] }
);