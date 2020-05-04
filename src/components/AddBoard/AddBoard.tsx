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

  // typeBoardName = (e: React.FormEvent<HTMLTextAreaElement>) => {
  //   const boardName = e.currentTarget.value;
  //   this.setState({ boardName });
  // };
  //
  // pressKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.keyCode === 27) {
  //     this.props.cancel();
  //   } else if (e.keyCode === 13) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     if (this.state.boardName.trim() === '') {
  //       this.props.cancel();
  //     } else {
  //       this.props.add(this.state.boardName);
  //     }
  //   }
  // };
  //
  // onBlur = (e: React.FormEvent<HTMLTextAreaElement>) => {
  //   if (this.state.boardName.trim() === '') {
  //     this.props.cancel();
  //   } else {
  //     this.props.add(this.state.boardName);
  //   }
  // };

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
    // if (e.keyCode === 13) this.props.add(this.state.boardName);
    if (e.keyCode === 13) this.setState({ isForceGetValue: true});
  };

  render() {
    const { cancel, add } = this.props;
    const { boardName, isForceGetValue } = this.state;
    return (
      <div className="AddBoard">
        {/*<textarea*/}
        {/*  value={boardName}*/}
        {/*  placeholder="Board name"*/}
        {/*  autoFocus={true}*/}
        {/*  onChange={this.typeBoardName}*/}
        {/*  onKeyDown={this.pressKey}*/}
        {/*  onBlur={this.onBlur}*/}
        {/*/>*/}
        <AddTextValue
          startValue={boardName}
          returnValueAction={this.addNewBoard}
          placeholder='Board name'
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
