import React, { createRef, RefObject } from 'react';
import './BoardItem.scss';
import { BoardType, TaskType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';
import API from '../../../API';
import Task from '../../../components/Task/Task';
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu';
import { DropDownProps } from '../../../types/types';
import AddTextValue from '../../../components/AddTextValue/AddTextValue';

interface IProps extends BoardType {
  scrollDown: (size: number) => void;
  boardHeight: number;
  updateBoards: () => void;
  tasks: Array<TaskType>;
}

type State = {
  isAddingTask: boolean;
  borderRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  isEditBoardName: boolean;
  visibleDropDownMenu: 'visible' | 'hidden';
  isOnFocusElement: boolean;
};

class BoardItem extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAddingTask: false,
      borderRef: createRef<HTMLDivElement>(),
      containerRef: createRef<HTMLDivElement>(),
      isEditBoardName: false,
      visibleDropDownMenu: 'hidden',
      isOnFocusElement: false,
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

  addNewTask = async (isCancel: boolean, value: string) => {
    if (isCancel) {
      this.setState({ isAddingTask: false });
    } else {
      const res = await API.addNewTask(this.props.id, value);
      if (res) {
        this.setState({ isAddingTask: false });
        this.props.updateBoards();
      }
    }
  };

  editBoardName = () => this.setState({ isEditBoardName: true });

  pressEditBoardName = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) this.editBoardName();
  };

  saveNewBoardName = async (isCancel: boolean, value: string) => {
    const { id } = this.props;
    if (isCancel) {
      this.setState({ isEditBoardName: false });
    } else {
      const result = await API.saveNewBoardText(id, value);
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
      borderRef,
      containerRef,
      isEditBoardName,
      isOnFocusElement,
      visibleDropDownMenu,
    } = this.state;

    const newTask = isAddingTask ? (
      <AddTextValue
        startValue=""
        returnValueAction={this.addNewTask}
        placeholder="What needs to be done?"
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
      <AddTextValue
        startValue={boardName}
        returnValueAction={this.saveNewBoardName}
      />
    );

    const boardDropMenu: DropDownProps = [
      {
        actionName: 'Edit',
        action: this.editBoardName,
      },
      {
        actionName: 'Delete',
        action: this.deleteBoard,
      },
    ];

    return (
      <div className="BoardItem-container" ref={borderRef}>
        <div className="BoardItem" style={{ minHeight: `${boardHeight}px` }}>
          <div
            className="BoardItem-name"
            onClick={this.editBoardName}
            onKeyDown={this.pressEditBoardName}
            onMouseOver={this.mouseAboveElement}
            onMouseOut={this.mouseOutElement}
            onFocus={this.onFocusElement}
            onBlur={this.onBlurElement}
            role="button"
            tabIndex={0}
          >
            {viewBoardName}
            <div className="BoardItem-name-border" />
          </div>
          {isEditBoardName ? null : (
            <DropDownMenu
              actions={boardDropMenu}
              visibility={isOnFocusElement ? 'visible' : visibleDropDownMenu}
              styleClassName="BoardItem-name-dropDown"
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
