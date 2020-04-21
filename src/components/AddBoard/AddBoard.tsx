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

  typeBoardName = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const boardName = e.currentTarget.value;
    this.setState({ boardName })
  };
  pressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode === 27) {
      this.props.cancel();
      return;
    }
  };

  render() {
    console.log(this.state);
    const { cancel } = this.props;
    const { boardName } = this.state;
    return(
      <div className="AddBoard">
        <textarea
          value={boardName}
          placeholder="Board name"
          autoFocus={true}
          onChange={this.typeBoardName}
          onKeyDown={this.pressKey}/>
        <div className="AddBoard-choose">
          <span className="AddBoard-choose-add">Add</span>
          <span className="AddBoard-choose-cancel"
                onClick={cancel}>Cancel</span>
        </div>
      </div>
    );
  }
}

export default AddBoard;