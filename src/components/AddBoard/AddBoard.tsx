import React from 'react';
import './AddBoard.scss';
import AddTextValue from '../AddTextValue/AddTextValue';

type PropsType = {
  cancel: () => void;
  add: (boardName: string) => void;
};

type StateType = {
  boardName: string;
  isForceGetValue: boolean;
};

class AddBoard extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      boardName: '',
      isForceGetValue: false,
    };
  }

  addNewBoard = (isCancel: boolean, value: string) => {
    const { add, cancel } = this.props;
    if (isCancel) {
      cancel();
    } else {
      add(value);
    }
  };

  pressCancel = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.keyCode === 13) this.props.cancel();
  };

  pressAdd = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.keyCode === 13) this.setState({ isForceGetValue: true });
  };

  render() {
    const { cancel, add } = this.props;
    const { boardName, isForceGetValue } = this.state;
    return (
      <div className="AddBoard">
        <AddTextValue
          startValue={boardName}
          returnValueAction={this.addNewBoard}
          placeholder="Board name"
          isForceGetValue={isForceGetValue}
        />
        <div className="AddBoard-choose">
          <span
            className="AddBoard-choose-add"
            onClick={() => add(boardName)}
            role="button"
            tabIndex={0}
            onKeyDown={this.pressAdd}
          >
            Add
          </span>
          <span
            className="AddBoard-choose-cancel"
            onClick={cancel}
            role="button"
            tabIndex={0}
            onKeyDown={this.pressCancel}
          >
            Cancel
          </span>
        </div>
      </div>
    );
  }
}

export default AddBoard;
