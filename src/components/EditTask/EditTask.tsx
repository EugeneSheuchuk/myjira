import React from 'react';
import './EditTask.scss';

type Props = {
  taskText: string;
};

class EditTask extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return(
      <div>
        {this.props.taskText}
      </div>
    );
  }
}

export default EditTask;