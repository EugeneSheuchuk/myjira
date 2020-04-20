type Task = {
    taskName: string;
};
export type BoardTask = {
    boardName: string;
    tasks: Array<Task>;
};
type Boards = {
    boards: Array<BoardTask>;
};

const initialState: Boards = {
    boards: [],
};

const boardReducer = (state = initialState, action: any):Boards  => {
    switch (action.type) {
        default:
            return state;
    }
};

export default boardReducer;