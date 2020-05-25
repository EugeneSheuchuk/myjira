import React, { useState } from 'react';
import './Task.scss';
import { AxiosResponse } from 'axios';
import { TaskType } from '../../types/boardReducerTypes';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { DropDownProps, EditTaskDataType } from '../../types/types';
import API, { SortTasks } from '../../API';
import DeleteTask from '../Warnings/DeleteTask/DeleteTask';
import EditTask from '../EditTask/EditTask';

interface IProps extends TaskType {
  updateBoards: () => void;
  boardId: string;
  triggerPopUp: (status: boolean, viewComponent: JSX.Element | null) => void;
}

type State = 'visible' | 'hidden';

const Task: React.FC<IProps> = (
  { taskId,
    taskText,
    boardId,
    updateBoards,
    position,
    triggerPopUp }) => {
  const [visible, setVisible] = useState<State>('hidden');

  const mouseAboveElement = (e: React.MouseEvent) => setVisible('visible');
  const mouseOutElement = (e: React.MouseEvent) => setVisible('hidden');

  const deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const res: AxiosResponse<boolean> = await API.deleteTask(taskId);
    if (res) {
      updateBoards();
      triggerPopUp(false, null);
    }
    setVisible('hidden');
  };

  const cancelDeleteTask = (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent ): void => {
    e.preventDefault();
    e.stopPropagation();
    triggerPopUp(false, null);
  };

  const moveItem = async (direction: SortTasks) => {
    const result: AxiosResponse<boolean> = await API.moveTask(boardId, taskId, direction, position);
    if (result) updateBoards();
    setVisible('hidden');
  };

  const deleteWarning: JSX.Element = (
    <DeleteTask confirmAction={deleteTask} cancelAction={cancelDeleteTask} />
  );

  const cancelEditTask = (e: React.MouseEvent<HTMLDivElement> | KeyboardEvent ): void => {
    e.preventDefault();
    e.stopPropagation();
    triggerPopUp(false, null);
  };

  const acceptEditedTask = async (taskData: EditTaskDataType) => {
    if (taskData.taskText === taskText) {
      triggerPopUp(false, null);
      return;
    }
    const result = await API.changeTaskData(taskId, taskData);
    if (result) {
      triggerPopUp(false, null);
      updateBoards();
    }
  };

  const editTask: JSX.Element = (
    <EditTask taskText={taskText} cancelAction={cancelEditTask} acceptAction={acceptEditedTask} />
  );

  const taskDropMenu: DropDownProps = [
    {
      actionName: 'Edit',
      action: () => triggerPopUp(true, editTask),
    },
    {
      actionName: 'Delete',
      action: () => triggerPopUp(true, deleteWarning),
    },
    {
      actionName: 'Top of column',
      action: () => moveItem(SortTasks.TOP),
    },
    {
      actionName: 'Bottom of column',
      action: () => moveItem(SortTasks.BOTTOM),
    },
  ];

  return (
    <div className="Task" onMouseOver={mouseAboveElement} onMouseOut={mouseOutElement}>
      <p>{taskText}</p>
      <DropDownMenu actions={taskDropMenu} visibility={visible} styleClassName="Task-dropDown" />
    </div>
  );
};

export default Task;
