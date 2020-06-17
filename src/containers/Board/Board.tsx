import React, { createRef, RefObject } from 'react';
import './Board.scss';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { AxiosResponse } from 'axios';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { getBoardsFromState } from '../../store/selectors';
import { getBoardsFromServer, ActionSetBoards } from '../../store/actions';
import BoardItem from './BoardItem/BoardItem';
import { IState } from '../../store/rootReducer';
import { BoardType } from '../../types/boardReducerTypes';
import AddButton from '../../components/AddButton/AddButton';
import AddBoard from '../../components/AddBoard/AddBoard';
import API from '../../API';
import PopUp from '../PopUp/PopUp';

interface IProps {
  boards: Array<BoardType>;
  getBoards: () => void;
}

type StateType = {
  isAddingBoard: boolean;
  containerRef: RefObject<HTMLDivElement>;
  boardHeight: number;
  isShowPopUp: boolean;
  popupContent: JSX.Element | null;
};

class Board extends React.Component<IProps, StateType> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isAddingBoard: false,
      containerRef: createRef<HTMLDivElement>(),
      boardHeight: 200,
      isShowPopUp: false,
      popupContent: null,
    };
  }

  componentDidMount(): void {
    this.props.getBoards();
    this.scrollDown(this.state.boardHeight);
  }

  componentDidUpdate(): void {
    this.scrollRight();
  }

  changeIsAddingBoard = () => this.setState({ isAddingBoard: true }, () => this.scrollRight());

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
    const res: AxiosResponse<boolean> = await API.addNewBoard(boardName);
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

  triggerPopUp = (status: boolean, viewComponent: JSX.Element | null) => {
    this.setState({ isShowPopUp: status, popupContent: viewComponent });
  };

  onDragEnd = (result: DropResult):void => {
    console.log('result', result);
  };


  render() {
    const { boards } = this.props;
    const { isAddingBoard, containerRef, boardHeight, isShowPopUp, popupContent } = this.state;
    const boardsInfo = boards.map((item) => ({ boardName: item.boardName, boardId: item.id }));
    const viewBoards = boards.map((item) => {
      return (
        <BoardItem
          id={item.id}
          boardName={item.boardName}
          tasks={item.tasks}
          key={item.boardName}
          scrollDown={this.scrollDown}
          boardHeight={boardHeight}
          updateBoards={this.props.getBoards}
          triggerPopUp={this.triggerPopUp}
          boardsInfo={boardsInfo}
        />
      );
    });

    const newBoard = isAddingBoard ? (
      <AddBoard cancel={this.cancelIsAddingBoard} add={this.addNewBoard} />
    ) : null;

    const popUp = isShowPopUp ? <PopUp>{popupContent}</PopUp> : null;

    return (
      <div className="Board-container" ref={containerRef}>
        <DragDropContext onDragEnd={this.onDragEnd}>
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
        </DragDropContext>
        {popUp}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    boards: getBoardsFromState(state),
  };
};

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
