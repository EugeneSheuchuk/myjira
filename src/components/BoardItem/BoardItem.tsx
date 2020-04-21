import React from 'react';
import './BoardItem.scss';
import { BoardType } from '../../types/boardReducerTypes';
import AddButton from '../AddButton/AddButton';
import Add from '../../assets/images/add.png'

const BoardItem: React.FC<BoardType> = ({ boardName }) => {
  return (
    <div className="BoardItem">
      <div className="BoardItem-name">{boardName}</div>
      <div className="BoardItem-tasks" />
      <AddButton imgURL={Add} width={16} height={16} description='Add'/>
    </div>
  );
};

export default BoardItem;
