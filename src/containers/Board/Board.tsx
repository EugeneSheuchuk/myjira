import React, { createRef, RefObject } from 'react';
import './Board.scss';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getBoardsFromState } from '../../store/selectors';
import { getBoardsFromServer, ActionSetBoards } from '../../store/actions';
import BoardItem from './BoardItem/BoardItem';
import { IState } from '../../store/rootReducer';
import { BoardType } from '../../types/boardReducerTypes';
import AddButton from '../../components/AddButton/AddButton';
import AddBoard from '../../components/AddBoard/AddBoard';
import API from '../../API';

interface IProps {
  boards: Array<BoardType>;
  getBoards: () => void;
}

type StateType = {
  isAddingBoard: boolean;
  containerRef: RefObject<HTMLDivElement>;
  boardHeight: number;
};

class Board extends React.Component<IProps, StateType> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAddingBoard: false,
      containerRef: createRef<HTMLDivElement>(),
      boardHeight: 200,
    };
  }

  componentDidMount(): void {
    this.props.getBoards();
    this.scrollDown(this.state.boardHeight);
  }

  componentDidUpdate(): void {
    this.scrollRight();
  }

  changeIsAddingBoard = () =>
    this.setState({ isAddingBoard: true }, () => this.scrollRight());

  cancelIsAddingBoard = () => this.setState({ isAddingBoard: false });

  addBoardByMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    this.changeIsAddingBoard();
  };

  addBoardByKeyboard = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      this.changeIsAddingBoard();
    }
  };

  addNewBoard = async (boardName: string) => {
    const res = await API.addNewBoard(boardName);
    if (res) {
      this.cancelIsAddingBoard();
      this.props.getBoards();
    } else {
      this.cancelIsAddingBoard();
    }
  };

  scrollDown = (size: number) => {
    const elem = this.state.containerRef;
    if (elem.current === null) return;
    elem.current.scrollTop = elem.current.scrollHeight;
    const newSize = size - 50 < 200 ? 200 : size - 50;
    this.setState({ boardHeight: newSize });
  };

  scrollRight = () => {
    const elem = this.state.containerRef;
    if (elem.current === null) return;
    elem.current.scrollLeft = elem.current.scrollWidth;
  };

  render() {
    const { boards } = this.props;
    const { isAddingBoard, containerRef, boardHeight } = this.state;
    const viewBoards = boards.map((item) => {
      return (
        <BoardItem
          id={item.id}
          boardName={item.boardName}
          tasks={item.tasks}
          key={item.boardName}
          scrollDown={this.scrollDown}
          boardHeight={boardHeight}
        />
      );
    });

    const newBoard = isAddingBoard ? (
      <AddBoard cancel={this.cancelIsAddingBoard} add={this.addNewBoard} />
    ) : null;

    return (
      <div className="Board-container" ref={containerRef}>
        <div className="Board">
          {viewBoards}
          {newBoard}
          <AddButton
            width={25}
            height={25}
            action={this.addBoardByMouse}
            keyAction={this.addBoardByKeyboard}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  boards: getBoardsFromState(state),
});

// what params take ThunkDispatch
// S - type of State
// E - all types of data which action takes
// A - all types of action which may involve in component props
const mapDispatchToProps = (
  dispatch: ThunkDispatch<IState, Array<BoardType>, ActionSetBoards>
) => ({
  getBoards() {
    dispatch(getBoardsFromServer());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
