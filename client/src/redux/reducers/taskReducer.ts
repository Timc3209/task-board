import { ADD_BOARD, LOGOUT, taskState } from "../types";

const INITIAL_STATE: taskState = {
  boards: [],
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    case LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
