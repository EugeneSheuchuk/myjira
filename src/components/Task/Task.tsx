import React from 'react';
import './Task.scss';
import { TaskType } from '../../types/boardReducerTypes';

const Task: React.FC<TaskType> = ({ taskText }) => {
  return <div className="Task">{taskText}</div>;
};

export default Task;
