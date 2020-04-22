import React, { createRef, RefObject } from 'react';
import './BoardItem.scss';
import { BoardType, TaskType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';
import API from '../../../API';
import Task from '../../../components/Task/Task';

interface IProps extends BoardType {
  scrollDown: (size: number) => void;
  boardHeight: number;
}

type State = {
  isAddingTask: boolean;
  newTaskText: string;
  tasks: Array<TaskType>;
  borderRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
};

class BoardItem extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAddingTask: false,
      newTaskText: '',
      tasks: props.tasks,
      borderRef: createRef<HTMLDivElement>(),
      containerRef: createRef<HTMLDivElement>(),
    };
  }

  isScrolling = () => {
    const { borderRef, containerRef } = this.state;
    if (borderRef.current === null || containerRef.current === null) return;
    if (
      window.innerHeight - 70 < borderRef.current.scrollHeight &&
      window.innerHeight - 70 < containerRef.current.scrollHeight
    ) {
      this.props.scrollDown(containerRef.current.scrollHeight);
    }
  };

  changeIsAddingTask = () =>
    this.setState({ isAddingTask: true }, () => this.isScrolling());

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
      this.setState(
        {
          tasks,
          isAddingTask: false,
          newTaskText: '',
        },
        () => this.isScrolling()
      );
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
      this.setState({ isAddingTask: false });
      return;
    }
    this.addNewTask();
  };

  render() {
    const { boardName, boardHeight } = this.props;
    const {
      isAddingTask,
      newTaskText,
      tasks,
      borderRef,
      containerRef,
    } = this.state;

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
      <div className="BoardItem-container" ref={borderRef}>
        <div
          className="BoardItem"
          ref={containerRef}
          style={{ minHeight: `${boardHeight}px` }}
        >
          <div className="BoardItem-name">
            <span>{boardName}</span>
            <div />
          </div>
          <div className="BoardItem-tasks">
            {viewedTasks}
            {newTask}
          </div>
          <AddButton
            width={16}
            height={16}
            description="Create issue"
            action={this.addNewTaskTextByMouse}
            keyAction={this.addNewTaskTextByKeyBoard}
          />
        </div>
      </div>
    );
  }
}

export default BoardItem;
