import React from 'react';
import './EditTask.scss';
import Cancel from '../../assets/images/cancel.png';
import AddTextValue from '../AddTextValue/AddTextValue';

type Props = {
  taskText: string;
  cancelAction: (e: React.MouseEvent<HTMLDivElement> | KeyboardEvent) => void;
};

type State = {
  taskText: string;
  isEditTaskText: boolean;
};

class EditTask extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskText: props.taskText,
      isEditTaskText: false,
    };
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.pressEscToExitEditTask);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.pressEscToExitEditTask);
  }

  pressEscToExitEditTask = (e: KeyboardEvent) => {

    const { cancelAction } = this.props;
    if (e.key === 'Escape') {
      // @ts-ignore
      if (e.target.tagName.toLowerCase() === 'body') cancelAction(e);
    }
  };

  getNewTaskText = (isCancel: boolean, value: string) => {
    if (isCancel) {
      this.setState({ isEditTaskText: false });
    } else {
      this.setState({ isEditTaskText: false, taskText: value });
    }
  };

  startEditTaskText = (e:React.MouseEvent<HTMLParagraphElement>) => {
    this.setState({ isEditTaskText: true });
  };

  render() {
    const { cancelAction } = this.props;
    const { taskText, isEditTaskText } = this.state;

    const viewTaskText = isEditTaskText
      ? <AddTextValue
        startValue={taskText}
        returnValueAction={this.getNewTaskText}
      />
      : <p className='EditTask-taskText' onClick={this.startEditTaskText}>{taskText}</p>;

    return(
      <div className='EditTask'>
        <div className='EditTask-header'>
          <div onClick={cancelAction} role='button' tabIndex={0}>
            <img src={Cancel} alt='Close window' />
          </div>
        </div>
        <div className='EditTask-items'>
          <div>
            {viewTaskText}
          </div>
          <div>
            boards
          </div>
        </div>

      </div>
    );
  }
}

export default EditTask;