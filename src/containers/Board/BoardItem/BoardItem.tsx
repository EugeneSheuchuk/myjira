import React from 'react';
import './BoardItem.scss';
import Add from '../../../assets/images/add.png';
import { BoardType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';

type State = {
  isAddingTask: boolean
}

class BoardItem extends React.Component<BoardType, State> {
  constructor(props: BoardType) {
    super(props);
    this.state = {
      isAddingTask: false
    };
  }

  addTaskDescription = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isAddingTask: true });
  };

  render() {
    const { boardName } = this.props;
    const newTaskText = this.state.isAddingTask
      ? <textarea className='BoardItem-newTaskText'
                  placeholder='What needs to be done?'
                  autoFocus={true}/>
      : null;
    return (
      <div className="BoardItem">
        <div className="BoardItem-name">{boardName}</div>
        <div className="BoardItem-tasks"/>
        {newTaskText}
        <AddButton imgURL={Add}
                   width={16}
                   height={16}
                   description='Create issue'
                   action={this.addTaskDescription}/>
      </div>
    );
  }
}

export default BoardItem;
