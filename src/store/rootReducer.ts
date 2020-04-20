import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import { Boards } from '../types/boardReducerTypes';

export interface IState {
  board: Boards;
}

const rootReducer = combineReducers({
  board: boardReducer,
});

export default rootReducer;
