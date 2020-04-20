import React from 'react';
import './BoardItem.scss'
import { BoardTask } from '../../store/boardReducer';


const BoardItem: React.FC<BoardTask> = ({ boardName }) => {
    return (
        <div className='BoardItem'>
            <div className='BoardItem-name'>{boardName}</div>
            <div className='BoardItem-tasks'></div>
        </div>
    );
};

export default BoardItem;