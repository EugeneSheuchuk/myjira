import React from 'react';
import './DeleteBoard.scss';
import { DeleteWarningdProps } from '../../../types/types';



const DeleteBoard: React.FC<DeleteWarningdProps> = ({ confirmAction, cancelAction }) => {
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
