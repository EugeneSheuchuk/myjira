import React from 'react';
import './BoardItem.scss';
import { BoardType, TaskType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';
import API from '../../../API';
import Task from '../../../components/Task/Task';

type State = {
  isAddingTask: boolean;
  newTaskText: string;
  tasks: Array<TaskType>;
};

class BoardItem extends React.Component<BoardType, State> {
  constructor(props: BoardType) {
    super(props);
    this.state = {
      isAddingTask: false,
      newTaskText: '',
      tasks: props.tasks,
    };
  }

  changeIsAddingTask = () => this.setState({ isAddingTask: true });

  addNewTaskTextByMouse = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.changeIsAddingTask();
  };

  addNewTaskTextByKeyBoard = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.keyCode === 13) this.changeIsAddingTask();
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
        tasks,
        isAddingTask: false,
        newTaskText: '',
      });
    }
  };

  onPressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      if (this.state.newTaskText.trim() === '') {
        this.setState({ isAddingTask: false });
        return;
      }
      this.addNewTask();
    } else if (e.keyCode === 27) {
      this.setState({ isAddingTask: false, newTaskText: '' });
    }
  };

  onBlure = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (this.state.newTaskText.trim() === '') {
      debugger
      this.setState({ isAddingTask: false });
      return;
    }
    this.addNewTask();
  };

  render() {
    const { boardName } = this.props;
    const { isAddingTask, newTaskText, tasks } = this.state;

    const newTask = isAddingTask ? (
      <textarea
        className="BoardItem-newTask"
        placeholder="What needs to be done?"
        autoFocus={true}
        value={newTaskText}
        onKeyDown={this.onPressKey}
        onChange={this.typeText}
        onBlur={this.onBlure}
      />
    ) : null;

    const viewedTasks = tasks.map((item) => (
      <Task taskId={item.taskId} taskText={item.taskText} key={item.taskId} />
    ));

    return (
      <div className="BoardItem">
        <div className="BoardItem-name">{boardName}</div>
        <div className="BoardItem-tasks" />
        {viewedTasks}
        {newTask}
        <AddButton
          width={16}
          height={16}
          description="Create issue"
          action={this.addNewTaskTextByMouse}
          keyAction={this.addNewTaskTextByKeyBoard}
        />
      </div>
    );
  }
}

export default BoardItem;
