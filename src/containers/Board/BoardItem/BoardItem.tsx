import React, { createRef, RefObject } from 'react';
import './BoardItem.scss';
import { AxiosResponse } from 'axios';
import { BoardType, TaskType } from '../../../types/boardReducerTypes';
import AddButton from '../../../components/AddButton/AddButton';
import API from '../../../API';
import Task from '../../../components/Task/Task';
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu';
import { DropDownProps } from '../../../types/types';
import AddTextValue from '../../../components/AddTextValue/AddTextValue';
import { sortBoardTasks } from '../../../assets/helperFunctions';
import DeleteBoard from '../../../components/Warnings/DeleteBoard/DeleteBoard';

interface IProps extends BoardType {
  scrollDown: (size: number) => void;
  boardHeight: number;
  updateBoards: () => void;
  tasks: Array<TaskType>;
  triggerPopUp: (status: boolean, viewComponent: JSX.Element | null) => void;
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

  changeIsAddingTask = () => this.setState({ isAddingTask: true }, () => this.isScrolling());

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
      const res: AxiosResponse<boolean> = await API.addNewTask(this.props.id, value);
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
      const result: AxiosResponse<boolean> = await API.saveNewBoardText(id, value);
      if (result) {
        this.setState({ isEditBoardName: false });
        this.props.updateBoards();
      }
    }
  };

  deleteBoard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { id, updateBoards, triggerPopUp } = this.props;
    const result: AxiosResponse<boolean> = await API.deleteBoard(id);
    if (result) {
      updateBoards();
      triggerPopUp(false, null);
    }
  };

  cancelDeleteBoard = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    this.props.triggerPopUp(false, null);
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
    const { boardName, boardHeight, updateBoards, id, tasks, triggerPopUp } = this.props;
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

    const viewedTasks = tasks
      .sort(sortBoardTasks)
      .map((item) => (
        <Task
          taskId={item.taskId}
          taskText={item.taskText}
          updateBoards={updateBoards}
          boardId={id}
          position={item.position}
          key={item.taskId}
          triggerPopUp={triggerPopUp}
        />
      ));

    const viewBoardName = !isEditBoardName ? (
      <span className="BoardItem-name-text">{boardName}</span>
    ) : (
      <AddTextValue startValue={boardName} returnValueAction={this.saveNewBoardName} />
    );

    const deleteWarning: JSX.Element = (
      <DeleteBoard confirmAction={this.deleteBoard} cancelAction={this.cancelDeleteBoard} />
    );

    const boardDropMenu: DropDownProps = [
      {
        actionName: 'Edit',
        action: this.editBoardName,
      },
      {
        actionName: 'Delete',
        action: () => triggerPopUp(true, deleteWarning),
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
