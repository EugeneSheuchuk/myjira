import React from 'react';
import './BoardItem.scss';
import { BoardType } from '../../types/boardReducerTypes';

const BoardItem: React.FC<BoardType> = ({ boardName }) => {
  return (
    <div className="BoardItem">
      <div className="BoardItem-name">{boardName}</div>
      <div className="BoardItem-tasks" />
    </div>
  );
};

export default BoardItem;
