import React from 'react';
import './Board.scss';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getBoardsFromState } from '../../store/selectors';
import { getBoardsFromServer, ActionSetBoards } from '../../store/actions';
import BoardItem from './BoardItem/BoardItem';
import { IState } from '../../store/rootReducer';
import { BoardType } from '../../types/boardReducerTypes';
import AddButton from '../../components/AddButton/AddButton';

interface IProps {
  boards: Array<BoardType>;
  getBoards: () => void;
}

class Board extends React.Component<IProps> {
  componentDidMount(): void {
    this.props.getBoards();
  }

  render() {
    const { boards } = this.props;
    const viewBoards = boards.map((item) => {
      return (
        <BoardItem
          id={item.id}
          boardName={item.boardName}
          tasks={item.tasks}
          key={item.boardName}
        />
      );
    });
    return (
      <div className="Board">
        {viewBoards}
        <AddButton  width={25} height={25} action={()=>{}} keyAction={()=>{}}/>
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
