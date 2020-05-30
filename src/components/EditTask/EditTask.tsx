import React from 'react';
import './EditTask.scss';
import Cancel from '../../assets/images/cancel.png';
import AddTextValue from '../AddTextValue/AddTextValue';
import { EditTaskDataType, TaskCommentType } from '../../types/types';
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
    };
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.pressEscToExitEditTask);
    document.addEventListener('click', this.handleClickOutside);
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
      this.setState(
        {
          isEditTaskDescription: false,
          taskDescription: value,
          isEditAnyFields: true
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
        isCommentEdit: false,
      };
      const prevTaskComments = this.state.taskComments;
      const newTaskComments = [...prevTaskComments, newComment];
      this.setState(
        {
          isTypeComment: false,
          taskComments: newTaskComments,
          isEditAnyFields: true
        });
    }
  };

  startEditTaskText = (e:React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isEditTaskText: true });
  };

  startEditTaskDescription = (e:React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isEditTaskDescription: true, isTypeComment: false });
  };

  startTypeComment = (e:React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isTypeComment: true, isEditTaskDescription: false });
  };

  collectTaskData = (): EditTaskDataType => {
    const { taskText, taskDescription, taskComments } = this.state;
    return {
      taskText,
      taskDescription,
      taskComments,
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

  render() {
    const {
      taskText,
      isEditTaskText,
      taskDescription,
      isEditTaskDescription,
      createTime,
      updateTime,
      taskComments,
      isTypeComment, } = this.state;

    const viewTaskText = isEditTaskText
      ? <AddTextValue
        startValue={taskText}
        returnValueAction={this.getNewTaskText}
      />
      : <p className='EditTask-taskText' onClick={this.startEditTaskText}>{taskText}</p>;

    const viewTaskDescription = isEditTaskDescription
      ? <AddFormatText
        startValue={taskDescription}
        returnValueAction={this.getNewTaskDescription}
        placeholder='You can add a task description here...'
      />
      : <p className='EditTask-description' onClick={this.startEditTaskDescription}>
        {taskDescription === '' ? 'Click to add a description...' : taskDescription}
      </p>;

    const viewTaskComments = taskComments.map(task => {
      return <TaskComment {...task} key={task.commentDate} />;
    });

    const viewNewComment = isTypeComment
      ? <AddFormatText
        startValue=''
        returnValueAction={this.getNewCommentText}
        placeholder='Type your comment to the task'
      />
      : <p className='EditTask-newComment' onClick={this.startTypeComment}>Add a comment...</p>;

    return(
      <div className='EditTask'>
        <div className='EditTask-header'>
          <div onClick={this.hendleClickCloseButton} role='button' tabIndex={0}>
            <img src={Cancel} alt='Close window' />
          </div>
        </div>
        <div className='EditTask-items'>
          <div className='left'>
            {viewTaskText}
            <div className='EditTask-taskDescription'>
              <p>Description</p>
              {viewTaskDescription}
            </div>
            <div className='EditTask-comments'>
              <p>Activity</p>
              <p>Show: <span>Comments</span></p>
              {viewTaskComments}
              {viewNewComment}
            </div>
          </div>
          <div className='right'>
            boards
            <div className='EditTask-taskDate'>
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