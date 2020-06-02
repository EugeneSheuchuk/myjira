import React from 'react';
import { getCurrentDateAsString } from '../../assets/helperFunctions';
import { TaskCommentType } from '../../types/types';

interface IProps extends TaskCommentType {
  index: number;
  deleteTaskComment: (commentText: string, taskIndex: number) => void;
}

const TaskComment: React.FC<IProps> = (
  {
    commentDate,
    isCommentEdit,
    commentText,
    index,
    deleteTaskComment,
  }) => {
  return (
    <div className="TaskComment">
      <p>
        {getCurrentDateAsString(commentDate)}
        {isCommentEdit ? '  Edited' : ''}
      </p>
      <p>{commentText}</p>
      <button>Edit</button>
      <button onClick={() => deleteTaskComment(commentText, index)}>Delete</button>
      <div className='TaskComment-border' />
    </div>
  );
};

export default TaskComment;
