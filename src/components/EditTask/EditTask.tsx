import React from 'react';
import './EditTask.scss';
import Cancel from '../../assets/images/cancel.png';

type Props = {
  taskText: string;
  cancelAction: (e: React.MouseEvent<HTMLDivElement> | KeyboardEvent) => void;
};

class EditTask extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.pressEscToExitEditTask);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.pressEscToExitEditTask);
  }

  pressEscToExitEditTask = (e: KeyboardEvent) => {
    const { cancelAction } = this.props;
    if (e.key === 'Escape') cancelAction(e);
  };

  render() {
    const { cancelAction } = this.props;
    return(
      <div className='EditTask'>
        <div className='EditTask-header'>
          <div onClick={cancelAction} role='button' tabIndex={0}>
            <img src={Cancel} alt='Close window' />
          </div>
        </div>
        <div className='EditTask-items'>
          <div>
            {this.props.taskText}
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