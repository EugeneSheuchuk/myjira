import { BoardTask } from './store/boardReducer';
const boards: Array<BoardTask> = [
    {
        boardName: 'TO DO',
        tasks: [],
    },
    {
        boardName: 'IN PROGRESS',
        tasks: [],
    },
    {
        boardName: 'DONE',
        tasks: [],
    },
];
// Is it necessary to describe what the function returns? And if promis returns an error?
interface IAPI {
    getBoards: () => Promise<Array<BoardTask>>,
}

const API: IAPI = {
    getBoards() {
        return Promise.resolve(boards);
    }
};

export default API;