import React from 'react';
import './EditTask.scss';
import Cancel from '../../assets/images/cancel.png';

type Props = {
  taskText: string;
  cancelAction: (e: React.MouseEvent<HTMLImageElement> | KeyboardEvent) => void;
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
      <div>
        <div>
          <img src={Cancel} alt='Close window' onClick={cancelAction} />
        </div>
        {this.props.taskText}
      </div>
    );
  }
}

export default EditTask;