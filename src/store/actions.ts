import * as ACTIONS from './actionTypes';
import { BoardTask } from './boardReducer';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import API from '../API';

type ActionSetBoards = {
    type: typeof ACTIONS.BOARDREDUCER_SET_BOARDS;
    payload: Array<BoardTask>;
}
export const setBoards = (data: Array<BoardTask>): ActionSetBoards => (
    { type: ACTIONS.BOARDREDUCER_SET_BOARDS, payload: data }
);

export const getBoards = (): ThunkAction<void, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<any> => {
        try {
            const response = await API.getBoards();
            dispatch(setBoards(response));
        } catch (e) {
            // eslint-disable-next-line
            console.log(e);
        }
    }
};