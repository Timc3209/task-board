import {
  ADD_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
  LOAD_TASK,
  LOGOUT,
  TaskState,
} from "../types";

const INITIAL_STATE: TaskState = {
  boards: [],
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
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
    case LOAD_TASK:
      return {
        ...state,
        boards: state.boards.map((board: any) =>
          board.id === action.payload.id
            ? { ...board, taskList: action.payload.taskList }
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
    // case LOGOUT:
    //   return { ...INITIAL_STATE };
    default:
      return state;
  }
};
