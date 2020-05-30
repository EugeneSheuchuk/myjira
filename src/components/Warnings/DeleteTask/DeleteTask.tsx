import React, { useEffect } from 'react';
import './DeleteTask.scss';
import { DeleteWarningdProps } from '../../../types/types';

const DeleteTask: React.FC<DeleteWarningdProps> = ({ confirmAction, cancelAction }) => {
  useEffect(() => {
    function pressKey(e: KeyboardEvent) {
      if (e.key === 'Escape') cancelAction(e);
    }
    document.addEventListener('keydown', pressKey);
    return () => {
      document.removeEventListener('keydown', pressKey);
    };
  });

  return (
    <div className="DeleteTask">
      <h2>Delete task</h2>
      <p>Are you sure to delete this task?</p>
      <div className="DeleteTask-buttons">
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

export default DeleteTask;
