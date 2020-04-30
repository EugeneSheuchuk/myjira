import React, { createRef, RefObject } from 'react';
import './BoardItem.scss';
import { BoardType, TaskType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';
import API from '../../../API';
import Task from '../../../components/Task/Task';
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu';
import { DropDownProps } from '../../../types/types';

interface IProps extends BoardType {
  scrollDown: (size: number) => void;
  boardHeight: number;
  updateBoards: () => void;
  tasks: Array<TaskType>;
}

type State = {
  isAddingTask: boolean;
  newTaskText: string;
  borderRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  isEditBoardName: boolean;
  newBoardText: string;
  visibleDropDownMenu: 'visible' | 'hidden';
  isOnFocusElement: boolean;
};

class BoardItem extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAddingTask: false,
      newTaskText: '',
      borderRef: createRef<HTMLDivElement>(),
      containerRef: createRef<HTMLDivElement>(),
      isEditBoardName: false,
      newBoardText: '',
      visibleDropDownMenu: 'hidden',
      isOnFocusElement: false
    };
  }

  componentDidMount(): void {
    this.isScrolling();
  }

  isScrolling = () => {
    const { borderRef, containerRef } = this.state;
    if (borderRef.current === null || containerRef.current === null) return;

    //  80 - approximate sum 'add task' button height and  height 'new task text' field

    if (
      window.innerHeight < borderRef.current.scrollHeight &&
      window.innerHeight - 80 < containerRef.current.scrollHeight
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
      this.setState(
        {
          isAddingTask: false,
          newTaskText: ''
        });
      this.props.updateBoards();
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

  editBoardName = () => {
    const { boardName } = this.props;
    this.setState({
      isEditBoardName: true,
      newBoardText: boardName
    });
  };

  pressEditBoardName = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) this.editBoardName();
  };

  newBoardName = (e: React.FormEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value;
    this.setState({ newBoardText: newText });
  };

  saveNewBoardName = async () => {
    const { id, boardName } = this.props;
    const { newBoardText } = this.state;
    if (newBoardText.trim() === '' || newBoardText === boardName) {
      this.setState({ isEditBoardName: false, newBoardText: '' });
    } else {
      const result = await API.saveNewBoardText(id, newBoardText);
      if (result) {
        this.setState({ isEditBoardName: false });
        this.props.updateBoards();
      }
    }
  };

  deleteBoard = async () => {
    const { id, updateBoards } = this.props;
    const result = API.deleteBoard(id);
    if (result) updateBoards();
  };

  mouseAboveElement = (e: React.MouseEvent) => {
    this.setState({ visibleDropDownMenu: 'visible' });
  };

  mouseOutElement = (e: React.MouseEvent) => {
    this.setState({ visibleDropDownMenu: 'hidden' });
  };

  onFocusElement = () => {
    this.setState({ isOnFocusElement: true });
  };

  onBlurElement = () => {
    this.setState({ isOnFocusElement: false });
  };

  render() {
    const { boardName, boardHeight, updateBoards, id, tasks } = this.props;
    const {
      isAddingTask,
      newTaskText,
      borderRef,
      containerRef,
      isEditBoardName,
      newBoardText,
      isOnFocusElement,
      visibleDropDownMenu
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
      <Task
        taskId={item.taskId}
        taskText={item.taskText}
        updateBoards={updateBoards}
        boardId={id}
        key={item.taskId}
      />
    ));

    const viewBoardName = !isEditBoardName ? (
      <span className="BoardItem-name-text">{boardName}</span>
    ) : (
      <input
        type="text"
        value={newBoardText}
        autoFocus={true}
        onChange={this.newBoardName}
        onBlur={this.saveNewBoardName}
      />
    );
    const boardDropMenu: DropDownProps = [
      {
        actionName: 'Edit',
        action: this.editBoardName
      },
      {
        actionName: 'Delete',
        action: this.deleteBoard
      }
    ];

    return (
      <div className="BoardItem-container" ref={borderRef}>
        <div
          className="BoardItem"
          style={{ minHeight: `${boardHeight}px` }}
        >
          <div
            className="BoardItem-name"
            onClick={this.editBoardName}
            onKeyDown={this.pressEditBoardName}
            onMouseOver={this.mouseAboveElement}
            onMouseOut={this.mouseOutElement}
            onFocus={this.onFocusElement}
            onBlur={this.onBlurElement}
            role='button'
            tabIndex={0}
          >
            {viewBoardName}
            <div className="BoardItem-name-border" />
          </div>
          {isEditBoardName ? null : (
            <DropDownMenu
              actions={boardDropMenu}
              visibility={isOnFocusElement ? 'visible' : visibleDropDownMenu}
              styleClassName='BoardItem-name-dropDown'
            />
          )}
          <div className="BoardItem-tasks" ref={containerRef}>
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
        </div>
      </div>
    );
  }
}

export default BoardItem;
