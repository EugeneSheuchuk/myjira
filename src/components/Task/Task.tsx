import React, { useState } from 'react';
import './Task.scss';
import { AxiosResponse } from 'axios';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { TaskType } from '../../types/boardReducerTypes';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { BoardData, DropDownProps, EditTaskDataType } from '../../types/types';
import API, { SortTasks } from '../../API';
import DeleteTask from '../Warnings/DeleteTask/DeleteTask';
import EditTask from '../EditTask/EditTask';

interface IProps extends TaskType {
  updateBoards: () => void;
  boardId: string;
  triggerPopUp: (status: boolean, viewComponent: JSX.Element | null) => void;
  boardsInfo: Array<BoardData>;
  isSingle: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef: any;
}

type State = {
  handlerVisibleDropDownMenu: 'visible' | 'hidden';
};

// const Task: React.FC<IProps> = ({
//   taskId,
//   taskText,
//   boardId,
//   updateBoards,
//   position,
//   triggerPopUp,
//   taskDescription,
//   createTime,
//   updateTime,
//   taskComments,
//   boardsInfo,
//   isSingle,
// }) => {
//   const [visible, setVisible] = useState<State>('hidden');
//
//   const mouseAboveElement = (e: React.MouseEvent) => setVisible('visible');
//   const mouseOutElement = (e: React.MouseEvent) => setVisible('hidden');
//
//   const deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const res: AxiosResponse<boolean> = await API.deleteTask(taskId);
//     if (res) {
//       updateBoards();
//       triggerPopUp(false, null);
//     }
//     setVisible('hidden');
//   };
//
//   const cancelDeleteTask = (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent): void => {
//     e.preventDefault();
//     e.stopPropagation();
//     triggerPopUp(false, null);
//   };
//
//   const moveItem = async (direction: SortTasks) => {
//     const result: AxiosResponse<boolean> = await API.moveTask(boardId, taskId, direction, position);
//     if (result) updateBoards();
//     setVisible('hidden');
//   };
//
//   const deleteWarning: JSX.Element = (
//     <DeleteTask confirmAction={deleteTask} cancelAction={cancelDeleteTask} />
//   );
//
//   const acceptEditedTask = async (isEdit: boolean, taskData: EditTaskDataType) => {
//     if (isEdit) {
//       const result = await API.changeTaskData(taskId, taskData);
//       if (result) {
//         triggerPopUp(false, null);
//         updateBoards();
//       }
//     } else {
//       triggerPopUp(false, null);
//     }
//   };
//
//   const editTask: JSX.Element = (
//     <EditTask
//       taskText={taskText}
//       acceptAction={acceptEditedTask}
//       taskDescription={taskDescription}
//       createTime={createTime}
//       updateTime={updateTime}
//       taskComments={taskComments}
//       boardId={boardId}
//       boardsInfo={boardsInfo}
//     />
//   );
//
//   const openEditPopup = (e?: React.MouseEvent<HTMLDivElement>) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     triggerPopUp(true, editTask);
//   };
//
//   const additionalOptions: DropDownProps = [
//     {
//       actionName: 'Top of column',
//       action: () => moveItem(SortTasks.TOP),
//     },
//     {
//       actionName: 'Bottom of column',
//       action: () => moveItem(SortTasks.BOTTOM),
//     },
//   ];
//
//   const DropMenu: DropDownProps = [
//     {
//       actionName: 'Edit',
//       action: () => openEditPopup(),
//     },
//     {
//       actionName: 'Delete',
//       action: () => triggerPopUp(true, deleteWarning),
//     },
//
//   ];
//
//   const taskDropMenu: DropDownProps = isSingle ? DropMenu : [...DropMenu, ...additionalOptions];
//
//
//   return (
//     <Draggable draggableId={taskId} index={position}>
//       {(provided: DraggableProvided) => (
//         // @ts-ignore
//         <div
//           className="Task"
//           onMouseOver={mouseAboveElement}
//           onMouseOut={mouseOutElement}
//           onClick={openEditPopup}
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//         >
//           <p>{taskText}</p>
//           <DropDownMenu actions={taskDropMenu} visibility={visible} styleClassName="Task-dropDown" />
//         </div>
//       )}
//     </Draggable>
//   );
// };

class Task extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      handlerVisibleDropDownMenu: 'hidden',
    };
  }

  mouseAboveElement = (e: React.MouseEvent) => this.setState({ handlerVisibleDropDownMenu: 'visible' });

  mouseOutElement = (e: React.MouseEvent) => this.setState({ handlerVisibleDropDownMenu: 'hidden' });

  deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { updateBoards, triggerPopUp, taskId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    const res: AxiosResponse<boolean> = await API.deleteTask(taskId);
    if (res) {
      updateBoards();
      triggerPopUp(false, null);
    }
    this.setState({ handlerVisibleDropDownMenu: 'hidden' });
  };

  cancelDeleteTask = (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent): void => {
    const { triggerPopUp } = this.props;
    e.preventDefault();
    e.stopPropagation();
    triggerPopUp(false, null);
  };

  moveItem = async (direction: SortTasks) => {
    const { updateBoards, boardId, taskId, position } = this.props;
    const result: AxiosResponse<boolean> = await API.moveTask(boardId, taskId, direction, position);
    if (result) updateBoards();
    this.setState({ handlerVisibleDropDownMenu: 'hidden' });
  };

  acceptEditedTask = async (isEdit: boolean, taskData: EditTaskDataType) => {
    const { updateBoards, triggerPopUp, taskId } = this.props;
    if (isEdit) {
      const result = await API.changeTaskData(taskId, taskData);
      if (result) {
        triggerPopUp(false, null);
        updateBoards();
      }
    } else {
      triggerPopUp(false, null);
    }
  };

  openEditPopup = (e?: React.MouseEvent<HTMLDivElement>) => {
    const {
      taskText,
      boardId,
      triggerPopUp,
      taskDescription,
      createTime,
      updateTime,
      taskComments,
      boardsInfo,
    } = this.props;

    const editTask: JSX.Element = (
      <EditTask
        taskText={taskText}
        acceptAction={this.acceptEditedTask}
        taskDescription={taskDescription}
        createTime={createTime}
        updateTime={updateTime}
        taskComments={taskComments}
        boardId={boardId}
        boardsInfo={boardsInfo}
      />
    );

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    triggerPopUp(true, editTask);
  };

  render(){
    const {
      taskId,
      taskText,
      position,
      triggerPopUp,
      isSingle,
    } = this.props;

    const { handlerVisibleDropDownMenu } = this.state;

    const deleteWarning: JSX.Element = (
      <DeleteTask confirmAction={this.deleteTask} cancelAction={this.cancelDeleteTask} />
    );


    const additionalOptions: DropDownProps = [
      {
        actionName: 'Top of column',
        action: () => this.moveItem(SortTasks.TOP),
      },
      {
        actionName: 'Bottom of column',
        action: () => this.moveItem(SortTasks.BOTTOM),
      },
    ];

    const DropMenu: DropDownProps = [
      {
        actionName: 'Edit',
        action: () => this.openEditPopup(),
      },
      {
        actionName: 'Delete',
        action: () => triggerPopUp(true, deleteWarning),
      },

    ];

    const taskDropMenu: DropDownProps = isSingle ? DropMenu : [...DropMenu, ...additionalOptions];

    return(
      <Draggable draggableId={taskId} index={position}>
        {(provided: DraggableProvided) => (
          // @ts-ignore
          <div
            className="Task"
            onMouseOver={this.mouseAboveElement}
            onMouseOut={this.mouseOutElement}
            onClick={this.openEditPopup}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <p>{taskText}</p>
            <DropDownMenu actions={taskDropMenu} visibility={handlerVisibleDropDownMenu} styleClassName="Task-dropDown" />
          </div>
        )}
      </Draggable>
    );
  }
}


export default Task;
