import React from 'react';
import './AddBoard.scss';

type PropsType = {
  cancel: () => void
};

type StateType = {
  boardName: string
};

class AddBoard extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      boardName: ''
    };
  }
  render() {
    return(
      <div className="AddBoard">

      </div>
    );
  }
}

export default AddBoard;