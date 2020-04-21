import React from 'react';
import './BoardItem.scss';
import Add from '../../../assets/images/add.png';
import { BoardType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';

type State = {
  isAddingTask: boolean
  newTaskText: string
}

class BoardItem extends React.Component<BoardType, State> {
  constructor(props: BoardType) {
    super(props);
    this.state = {
      isAddingTask: false,
      newTaskText: '',
    };
  }

  addTaskDescription = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isAddingTask: true });
  };

  typeText = (e:React.FormEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    this.setState({ newTaskText: text });
  };

  render() {
    const { boardName } = this.props;
    const { isAddingTask, newTaskText } = this.state;
    const newTask = isAddingTask
      ? <textarea className='BoardItem-newTask'
                  placeholder='What needs to be done?'
                  autoFocus={true}
                  value={newTaskText}
                  onChange={(e) => this.typeText(e)}/>
      : null;
    return (
      <div className="BoardItem">
        <div className="BoardItem-name">{boardName}</div>
        <div className="BoardItem-tasks"/>
        {newTask}
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
