import React from 'react';
import './DeleteBoard.scss';

export type DeleteBoardProps = {
  confirmAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cancelAction: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const DeleteBoard: React.FC<DeleteBoardProps> = ({ confirmAction, cancelAction }) => {
  return (
    <div className="DeleteBoard">
      <h2>Delete board</h2>
      <p>Are you sure to delete this board with all data?</p>
      <div className="DeleteBoard-buttons">
        <button onClick={confirmAction} type="button" tabIndex={0}>
          Delete
        </button>
        <button onClick={cancelAction} type="button" tabIndex={0}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBoard;
