import React, { useState } from 'react';
import './Task.scss';
import { TaskType } from '../../types/boardReducerTypes';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DropDownProps } from '../../types/types';
import API from '../../API';

interface IProps extends TaskType {
  updateBoards: () => void;
  boardId: number;
}

type State = 'visible' | 'hidden';

const Task: React.FC<IProps> = (
  { taskId, taskText, boardId, updateBoards }) => {
  const [visible, setVisible] = useState<State>('hidden');

  const mouseAboveElement = (e: React.MouseEvent) => setVisible('visible');
  const mouseOutElement = (e: React.MouseEvent) => setVisible('hidden');

  const deleteTask = async () => {
    const res = await API.deleteTask(boardId, taskId);
    if (res) updateBoards();
    setVisible('hidden');
  };

  const moveItem = async (direction: 'top' | 'bottom') => {
    const result = await API.moveTask(boardId, taskId, direction);
    if (result) updateBoards();
    setVisible('hidden');
  };

  const taskDropMenu: DropDownProps = [
    {
      actionName: 'Edit',
      action: () => {},
    },
    {
      actionName: 'Delete',
      action: deleteTask,
    },
    {
      actionName: 'Top of column',
      action: () => moveItem('top'),
    },
    {
      actionName: 'Bottom of column',
      action: () => moveItem('bottom'),
    },
  ];

  return (
    <div
      className="Task"
      onMouseOver={mouseAboveElement}
      onMouseOut={mouseOutElement}
    >
      <p>{taskText}</p>
      <DropDownMenu
        actions={taskDropMenu}
        visibility={visible}
        styleClassName='Task-dropDown'
      />
    </div>
  );
};

export default Task;
