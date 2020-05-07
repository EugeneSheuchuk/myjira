import React from 'react';
import './DeleteTask.scss';
import { DeleteWarningdProps } from '../../../types/types';

const DeleteTask: React.FC<DeleteWarningdProps> = ({ confirmAction, cancelAction }) => {
  return (
    <div className="DeleteTask">
      <h2>Delete task</h2>
      <p>Are you sure to delete this task?</p>
      <div className="DeleteTask-buttons">
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

export default DeleteTask;
