import{ AxiosResponse } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import * as ACTIONS from './actionTypes';
import API from '../API';
import { BoardType } from '../types/boardReducerTypes';

export type ActionSetBoards = {
  type: typeof ACTIONS.BOARDREDUCER_SET_BOARDS;
  payload: Array<BoardType>;
};
export const setBoards = (data: Array<BoardType>): ActionSetBoards => ({
  type: ACTIONS.BOARDREDUCER_SET_BOARDS,
  payload: data,
});

export const getBoardsFromServer =
(): ThunkAction<void, {}, {}, ActionSetBoards> => {
  return async (
    dispatch: ThunkDispatch<{}, {}, ActionSetBoards>
  ): Promise<void> => {
    try {
      const response: Array<BoardType> = await API.getBoards();
      const { data }  = response;
      dispatch(setBoards([...data]));
    } catch (e) {
      console.log(e);
    }
  };
};
/* tslint:enable */
export type BoardReducerActionsType = ActionSetBoards;
