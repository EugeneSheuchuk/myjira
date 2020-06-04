import React from 'react';
import './TaskComment.scss';
import { getCurrentDateAsString } from '../../assets/helperFunctions';
import { TaskCommentType } from '../../types/types';

interface IProps extends TaskCommentType {
  index: number;
  deleteTaskComment: (commentText: string, taskIndex: number) => void;
  startEditTaskComment: (taskIndex: number) => void;
}

const TaskComment: React.FC<IProps> = (
  {
    commentDate,
    isCommentEdited,
    commentText,
    index,
    deleteTaskComment,
    startEditTaskComment,
  }) => {
  return (
    <div className="TaskComment">
      <p>
        {getCurrentDateAsString(commentDate)}
        {isCommentEdited ? <span>    Edited</span> : ''}
      </p>
      <p className="TaskComment-commentText">{commentText}</p>
      <button onClick={() => startEditTaskComment(index)}>Edit</button>
      <button onClick={() => deleteTaskComment(commentText, index)}>Delete</button>
    </div>
  );
};

export default TaskComment;
