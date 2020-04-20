import React from 'react';
import './Board.scss';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { getBoardsFromState } from '../../store/selectors';
import { getBoardsFromServer } from '../../store/actions';
import BoardItem from '../../components/BoardItem/BoardItem';
import { IState } from '../../store/rootReducer';
import { BoardType } from '../../types/boardReducerTypes';

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
          boardName={item.boardName}
          tasks={item.tasks}
          key={item.boardName}
        />
      );
    });
    return <div className="Board">{viewBoards}</div>;
  }
}

const mapStateToProps = (state: IState) => ({
  boards: getBoardsFromState(state),
});

// what params take ThunkDispatch?
// eslint-disable-next-line
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  getBoards() {
    dispatch(getBoardsFromServer());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
