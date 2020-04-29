import React, {useState} from 'react';
import './Task.scss';
import { TaskType } from '../../types/boardReducerTypes';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DropDownProps } from '../../types/types';

const Task: React.FC<TaskType> = ({ taskId, taskText }) => {
  const [visible, setVisible] = useState<'visible' | 'hidden'>('visible');

  const mouseAboveElement = (e: React.MouseEvent) => setVisible('visible');
  const mouseOutElement = (e: React.MouseEvent) => setVisible('hidden');

  const taskDropMenu: DropDownProps = [
    {
      actionName: 'Edit',
      action: () => {},
    },
    {
      actionName: 'Delete',
      action: () => {},
    },
    {
      actionName: 'Top of column',
      action: () => {},
    },
    {
      actionName: 'Bottom of column',
      action: () => {},
    },
  ];

  return (
    <div className="Task"
         onMouseOver={mouseAboveElement}
         onMouseOut={mouseOutElement}>
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
