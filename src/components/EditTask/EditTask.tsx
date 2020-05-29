import React from 'react';
import './EditTask.scss';
import Cancel from '../../assets/images/cancel.png';
import AddTextValue from '../AddTextValue/AddTextValue';
import { EditTaskDataType } from '../../types/types';
import { getCurrentDateAsString } from '../../assets/helperFunctions';
import AddFormatText from '../AddFormatText/AddFormatText';

type Props = {
  taskText: string;
  acceptAction: (taskData: EditTaskDataType) => void;
  taskComment: string;
  createTime: number;
};

type State = {
  taskText: string;
  isEditTaskText: boolean;
  isEditTaskDescription: boolean;
  taskComment: string;
  createTime: number;
};

class EditTask extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskText: props.taskText,
      isEditTaskText: false,
      isEditTaskDescription: false,
      taskComment: props.taskComment,
      createTime: props.createTime,
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
        this.props.acceptAction(taskData);
      }
    }
  };

  getNewTaskText = (isCancel: boolean, value: string) => {
    if (isCancel) {
      this.setState({ isEditTaskText: false });
    } else {
      this.setState({ isEditTaskText: false, taskText: value });
    }
  };

  getNewTaskDescription = (isCancel: boolean, value: string) => {
    if (isCancel) {
      this.setState({ isEditTaskDescription: false });
    } else {
      this.setState({ isEditTaskDescription: false, taskComment: value });
    }
  };

  startEditTaskText = (e:React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isEditTaskText: true });
  };

  startEditTaskDescription = (e:React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isEditTaskDescription: true });
  };

  collectTaskData = (): EditTaskDataType => {
    const { taskText, taskComment } = this.state;
    return {
      taskText,
      taskComment,
    };
  };

  handleClickOutside = (e: MouseEvent) => {
    // @ts-ignore
    if (e.target.className === 'PopUp') {
      const taskData: EditTaskDataType = this.collectTaskData();
      this.props.acceptAction(taskData);
    }
  };

  hendleClickCloseButton = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const taskData: EditTaskDataType = this.collectTaskData();
    this.props.acceptAction(taskData);
  };

  render() {
    const { taskText,
      isEditTaskText,
      taskComment,
      isEditTaskDescription,
      createTime } = this.state;

    const viewTaskText = isEditTaskText
      ? <AddTextValue
        startValue={taskText}
        returnValueAction={this.getNewTaskText}
      />
      : <p className='EditTask-taskText' onClick={this.startEditTaskText}>{taskText}</p>;

    const viewTaskDescription = isEditTaskDescription
      ? <AddFormatText
        startValue={taskComment}
        returnValueAction={this.getNewTaskDescription}
        placeholder='You can add a task description here...'
      />
      : <p className='EditTask-description' onClick={this.startEditTaskDescription}>
        {taskComment === '' ? 'Click to add a description...' : taskComment}
      </p>;

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
          </div>
          <div className='right'>
            boards
            <div className='EditTask-taskDate'>
              <p>Created: {getCurrentDateAsString(createTime)}</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default EditTask;