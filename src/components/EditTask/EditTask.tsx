import React from 'react';
import './EditTask.scss';

type Props = {
  taskText: string;
  cancelAction: (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
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
    return(
      <div>
        {this.props.taskText}
      </div>
    );
  }
}

export default EditTask;