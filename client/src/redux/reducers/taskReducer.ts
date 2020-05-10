import {
  LOAD_BOARDS,
  LOAD_BOARD,
  ADD_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  MOVE_TASK,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  LOGOUT,
  TaskState,
} from "../types";

const INITIAL_STATE: TaskState = {
  boards: [],
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOAD_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    case EDIT_BOARD:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.id
            ? { ...board, name: action.payload.name }
            : board
        ),
      };
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(
          (board: any) => board.id !== action.payload.id
        ),
      };
    case ADD_LIST:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.boardID
            ? {
                ...board,
                taskList: [...board.taskList, action.payload.taskList],
              }
            : board
        ),
      };
    case EDIT_LIST:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.boardID
            ? {
                ...board,
                taskList: board.taskList.map((list: any) =>
                  list.id === action.payload.id
                    ? { ...list, name: action.payload.name }
                    : list
                ),
              }
            : board
        ),
      };
    case DELETE_LIST:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.boardID
            ? {
                ...board,
                taskList: board.taskList.filter(
                  (list: any) => list.id !== action.payload.id
                ),
              }
            : board
        ),
      };
    case ADD_TASK:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.boardID
            ? {
                ...board,
                taskList: board.taskList.map((list: any) =>
                  list.id === action.payload.listID
                    ? { ...list, tasks: [...list.tasks, action.payload.task] }
                    : list
                ),
              }
            : board
        ),
      };
    case EDIT_TASK:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.boardID
            ? {
                ...board,
                taskList: board.taskList.map((list: any) =>
                  list.id === action.payload.listID
                    ? {
                        ...list,
                        tasks: list.tasks.map((task: any) =>
                          task.id === action.payload.id
                            ? { ...task, name: action.payload.name }
                            : task
                        ),
                      }
                    : list
                ),
              }
            : board
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.boardID
            ? {
                ...board,
                taskList: board.taskList.map((list: any) =>
                  list.id === action.payload.listID
                    ? {
                        ...list,
                        tasks: list.tasks.filter(
                          (task: any) => task.id !== action.payload.id
                        ),
                      }
                    : list
                ),
              }
            : board
        ),
      };
    case LOAD_BOARD:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.id
            ? {
                ...board,
                name: action.payload.name,
                taskList: action.payload.taskList,
              }
            : board
        ),
      };
    case MOVE_TASK:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.boardID
            ? {
                ...board,
                taskList: board.taskList.map((list: any) =>
                  list.id === action.payload.id
                    ? { ...list, tasks: action.payload.tasks }
                    : list
                ),
              }
            : board
        ),
      };
    // case LOGOUT:
    //   return { ...INITIAL_STATE };
    default:
      return state;
  }
};
