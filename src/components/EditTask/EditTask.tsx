import React, { createRef, RefObject } from 'react';
import './EditTask.scss';
import Cancel from '../../assets/images/cancel.png';
import AddTextValue from '../AddTextValue/AddTextValue';
import { BoardData, EditTaskDataType, TaskCommentType } from '../../types/types';
import { getCurrentDateAsString } from '../../assets/helperFunctions';
import AddFormatText from '../AddFormatText/AddFormatText';
import TaskComment from '../TaskComment/TaskComment';

type Props = {
  taskText: string;
  acceptAction: (isEdit: boolean, taskData: EditTaskDataType) => void;
  taskDescription: string;
  createTime: number;
  updateTime: number;
  taskComments: Array<TaskCommentType>;
  boardId: string;
  boardsInfo: Array<BoardData>;
};

type State = {
  taskText: string;
  isEditTaskText: boolean;
  isEditTaskDescription: boolean;
  isTypeComment: boolean;
  taskDescription: string;
  createTime: number;
  updateTime: number;
  taskComments: Array<TaskCommentType>;
  isEditAnyFields: boolean;
  boardId: string;
  isClickOnBoardsPick: boolean;
  containerRef: RefObject<HTMLDivElement>;
};

class EditTask extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskText: props.taskText,
      isEditTaskText: false,
      isEditTaskDescription: false,
      taskDescription: props.taskDescription,
      createTime: props.createTime,
      updateTime: props.updateTime,
      taskComments: props.taskComments,
      isTypeComment: false,
      isEditAnyFields: false,
      boardId: props.boardId,
      isClickOnBoardsPick: false,
      containerRef: createRef<HTMLDivElement>(),
    };
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.pressEscToExitEditTask);
    document.addEventListener('click', this.handleClickOutside);
  }

  componentDidUpdate(): void {
    const { isTypeComment } = this.state;
    if (isTypeComment) this.scrollDown();
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.pressEscToExitEditTask);
    document.removeEventListener('click', this.handleClickOutside);
  }

  pressEscToExitEditTask = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      // @ts-ignore
      if (e.target.tagName.toLowerCase() === 'body') {
        const taskData: EditTaskDataType = this.collectTaskData();
        this.props.acceptAction(this.state.isEditAnyFields, taskData);
      }
    }
  };

  getNewTaskText = (isCancel: boolean, value: string) => {
    if (isCancel) {
      this.setState({ isEditTaskText: false });
    } else {
      this.setState({ isEditTaskText: false, taskText: value, isEditAnyFields: true });
    }
  };

  getNewTaskDescription = (isCancel: boolean, value: string) => {
    if (isCancel) {
      this.setState({ isEditTaskDescription: false });
    } else {
      this.setState({
        isEditTaskDescription: false,
        taskDescription: value,
        isEditAnyFields: true,
      });
    }
  };

  getNewCommentText = (isCancel: boolean, value: string) => {
    if (isCancel) {
      this.setState({ isTypeComment: false });
    } else {
      const newComment: TaskCommentType = {
        commentDate: new Date().getTime(),
        commentText: value,
        isCommentEdited: false,
        isCommentEditing: false,
      };
      const prevTaskComments = this.state.taskComments;
      const newTaskComments = [...prevTaskComments, newComment];
      this.setState({
        isTypeComment: false,
        taskComments: newTaskComments,
        isEditAnyFields: true,
      });
    }
  };

  startEditTaskText = (e: React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isEditTaskText: true });
  };

  startEditTaskDescription = (e: React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isEditTaskDescription: true, isTypeComment: false });
  };

  startTypeComment = (e: React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isTypeComment: true, isEditTaskDescription: false });
  };

  startChangingBoard = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ isClickOnBoardsPick: true });
  };

  startEditTaskComment = (taskIndex: number) => {
    const { taskComments } = this.state;
    taskComments[taskIndex].isCommentEditing = true;
    this.setState({ taskComments });
  };

  collectTaskData = (): EditTaskDataType => {
    const { taskText, taskDescription, taskComments, boardId } = this.state;
    return {
      taskText,
      taskDescription,
      taskComments,
      boardId,
    };
  };

  handleClickOutside = (e: MouseEvent) => {
    // @ts-ignore
    if (e.target.className === 'PopUp') {
      const taskData: EditTaskDataType = this.collectTaskData();
      this.props.acceptAction(this.state.isEditAnyFields, taskData);
    }
  };

  hendleClickCloseButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const taskData: EditTaskDataType = this.collectTaskData();
    this.props.acceptAction(this.state.isEditAnyFields, taskData);
  };

  changeCurrentBoardId = (e: React.MouseEvent<HTMLDivElement>, newId: string) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ boardId: newId, isEditAnyFields: true, isClickOnBoardsPick: false });
  };

  deleteTaskComment = (commentText: string, taskIndex: number) => {
    const { taskComments } = this.state;
    const filteredTaskComments = taskComments.filter((item, index) => {
      return !(item.commentText === commentText && taskIndex === index);
    });
    this.setState( { taskComments: filteredTaskComments, isEditAnyFields: true });
  };

  saveEditedTaskCommentCarrying = (taskIndex: number) => {
    return (isCancel: boolean, value: string) => {
      const { taskComments } = this.state;
      if (isCancel) {
        taskComments[taskIndex].isCommentEditing = false;
        this.setState({ taskComments });
      } else {
        taskComments[taskIndex] = {
          ...taskComments[taskIndex],
          isCommentEditing: false,
          commentText: value,
          isCommentEdited: true, };
        this.setState({ taskComments, isEditAnyFields: true });
      }
    };
  };

  scrollDown = () => {
    const elem = this.state.containerRef;
    if (elem.current === null) return;
    elem.current.scrollTop = elem.current.scrollHeight;
  };

  render() {
    const {
      taskText,
      isEditTaskText,
      taskDescription,
      isEditTaskDescription,
      createTime,
      updateTime,
      taskComments,
      isTypeComment,
      boardId,
      isClickOnBoardsPick,
      containerRef,
    } = this.state;

    const { boardsInfo } = this.props;

    const viewTaskText = isEditTaskText ? (
      <AddTextValue startValue={taskText} returnValueAction={this.getNewTaskText} />
    ) : (
      <p className="EditTask-taskText" onClick={this.startEditTaskText}>
        {taskText}
      </p>
    );

    const viewTaskDescription = isEditTaskDescription ? (
      <AddFormatText
        startValue={taskDescription}
        returnValueAction={this.getNewTaskDescription}
        placeholder="You can add a task description here..."
      />
    ) : (
      <p className="EditTask-description" onClick={this.startEditTaskDescription}>
        {taskDescription === '' ? 'Click to add a description...' : taskDescription}
      </p>
    );

    const viewTaskComments = taskComments.map((task, index) => {
      if (task.isCommentEditing) {
        return <AddFormatText
          startValue={task.commentText}
          returnValueAction={this.saveEditedTaskCommentCarrying(index)}
          key={task.commentDate}
        />;
      } 
      return <TaskComment
        {...task}
        key={task.commentDate}
        index={index}
        deleteTaskComment={this.deleteTaskComment}
        startEditTaskComment={this.startEditTaskComment}
      />;
      
    });

    const viewNewComment = isTypeComment ? (
      <AddFormatText
        startValue=""
        returnValueAction={this.getNewCommentText}
        placeholder="Type your comment to the task"
      />
    ) : (
      <p className="EditTask-newComment" onClick={this.startTypeComment}>
        Add a comment...
      </p>
    );

    let currentBoardName = '';
    const otherBoards = boardsInfo.filter((item) => {
      if (item.boardId === boardId) {
        currentBoardName = item.boardName;
        return false;
      }
      return true;
    });

    const alternativeBoards = otherBoards.map((item) => {
      return (
        <div key={item.boardName} onClick={(e) => this.changeCurrentBoardId(e, item.boardId)}>
          {item.boardName}
        </div>
      );
    });

    const viewAlternativeBoard = isClickOnBoardsPick ? (
      <div className="EditTask-optionsContainer">
        <div className="options">{alternativeBoards}</div>
      </div>
    ) : null;

    const viewBoard = (
      <div className="EditTask-board" onClick={this.startChangingBoard}>
        {currentBoardName} <span className="rotate">{'>'}</span>
        {viewAlternativeBoard}
      </div>
    );

    return (
      <div className="EditTask" ref={containerRef}>
        <div className="EditTask-header">
          <div onClick={this.hendleClickCloseButton} role="button" tabIndex={0}>
            <img src={Cancel} alt="Close window" />
          </div>
        </div>
        <div className="EditTask-items">
          <div className="left">
            {viewTaskText}
            <div className="EditTask-taskDescription">
              <p>Description</p>
              {viewTaskDescription}
            </div>
            <div className="EditTask-comments">
              <p>Activity</p>
              <p>
                Show: <span>Comments</span>
              </p>
              {viewTaskComments}
              <div className="EditTask-typeNewComment">
                {viewNewComment}
              </div>
            </div>
          </div>
          <div className="right">
            {viewBoard}
            <div className="EditTask-taskDate">
              <p>Created: {getCurrentDateAsString(createTime)}</p>
              <p>{updateTime ? `Updated: ${getCurrentDateAsString(updateTime)}` : ''}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTask;
