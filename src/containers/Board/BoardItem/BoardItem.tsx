import React from 'react';
import './BoardItem.scss';
import Add from '../../../assets/images/add.png';
import { BoardType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';
import { Task } from '../../../types/boardReducerTypes';
import API from '../../../API';

type State = {
  isAddingTask: boolean
  newTaskText: string
  tasks: Array<Task>
}

class BoardItem extends React.Component<BoardType, State> {
  constructor(props: BoardType) {
    super(props);
    this.state = {
      isAddingTask: false,
      newTaskText: '',
      tasks: props.tasks
    };
  }

  addTaskDescription = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isAddingTask: true });
  };

  typeText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    this.setState({ newTaskText: text });
  };

  addNewTask = async () => {
    const res = await API.addNewTask(this.props.id, this.state.newTaskText);
    if (res) {
      const tasks = await API.getBoardTasks(this.props.id);
      this.setState({
        tasks: tasks,
        isAddingTask: false,
        newTaskText: ''
      });
    }
  };

  onPressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      if (this.state.newTaskText.trim() === '') {
        this.setState({ isAddingTask: false});
        return;
      }
      this.addNewTask();
    } else if (e.keyCode === 27) {
      this.setState({ isAddingTask: false, newTaskText: ''});
    }
  };

  onBlure = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if(this.state.newTaskText.trim() === '') {
      this.setState({ isAddingTask: false});
      return
    }
    this.addNewTask();
  };

  render() {
    console.log(this.state);
    const { boardName } = this.props;
    const { isAddingTask, newTaskText } = this.state;
    const newTask = isAddingTask
      ? <textarea className='BoardItem-newTask'
                  placeholder='What needs to be done?'
                  autoFocus={true}
                  value={newTaskText}
                  onKeyDown={this.onPressKey}
                  onChange={this.typeText}
                  onBlur={this.onBlure}
                  />
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
