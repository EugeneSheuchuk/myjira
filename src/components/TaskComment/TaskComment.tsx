import React from 'react';
import { getCurrentDateAsString } from '../../assets/helperFunctions';
import { TaskCommentType } from '../../types/types';

const TaskComment: React.FC<TaskCommentType> = ({ commentDate, isCommentEdit, commentText }) => {
  return (
    <div className="TaskComment">
      <p>
        {getCurrentDateAsString(commentDate)}
        {isCommentEdit ? '  Edited' : ''}
      </p>
      <p>{commentText}</p>
    </div>
  );
};

export default TaskComment;
