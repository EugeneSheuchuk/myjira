import React from 'react';
import './Board.scss';

class Board extends React.Component {
  render() {
    return (
      <div className="Board">
        <div className="Board_item">
          <div className="Board_item_name">TO DO</div>
        </div>
        <div className="Board_item">
          <div className="Board_item_name">IN PROGRESS</div>
        </div>
        <div className="Board_item">
          <div className="Board_item_name">DONE</div>
        </div>
      </div>
    );
  }
}

export default Board;
