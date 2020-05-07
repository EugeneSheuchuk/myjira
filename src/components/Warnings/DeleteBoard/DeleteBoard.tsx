import React, { useEffect } from 'react';
import './DeleteBoard.scss';
import { DeleteWarningdProps } from '../../../types/types';

const DeleteBoard: React.FC<DeleteWarningdProps> = ({ confirmAction, cancelAction }) => {

  useEffect(()=> {
    function pressKey(e: KeyboardEvent) {
      if (e.key === 'Escape') cancelAction(e);
    }
    document.addEventListener('keydown', pressKey);
    return () => {
      document.removeEventListener('keydown', pressKey);
    };
  });

  return (
    <div className="DeleteBoard">
      <h2>Delete board</h2>
      <p>Are you sure to delete this board with all data?</p>
      <div className="DeleteBoard-buttons">
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <button onClick={confirmAction} type="button" tabIndex={0} autoFocus={true}>
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
