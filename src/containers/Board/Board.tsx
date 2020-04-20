import React from 'react';
import './Board.scss';

class Board extends React.Component {
  render() {
    return (
      <div className="Board">
        <div className="Board-item">
          <div className="Board-itemName">TO DO</div>
        </div>
        <div className="Board-item">
          <div className="Board-itemName">IN PROGRESS</div>
        </div>
        <div className="Board-item">
          <div className="Board-itemName">DONE</div>
        </div>
      </div>
    );
  }
}

export default Board;
