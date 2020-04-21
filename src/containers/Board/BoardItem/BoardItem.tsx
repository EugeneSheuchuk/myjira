import React from 'react';
import './BoardItem.scss';
import Add from '../../../assets/images/add.png';
import { BoardType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';

class BoardItem extends React.Component<BoardType> {
  render() {
    const {boardName} = this.props;
    return (
      <div className="BoardItem">
        <div className="BoardItem-name">{boardName}</div>
        <div className="BoardItem-tasks"/>
        <AddButton imgURL={Add} width={16} height={16} description='Add'/>
      </div>
    );
  }
}

export default BoardItem;
