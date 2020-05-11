import { LOGIN_SUCCESS, LOGOUT, SET_CURRENT_BOARD, AuthState } from "../types";

const INITIAL_STATE: AuthState = {
  loggedIn: false,
  token: "",
  currentBoard: "0",
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case SET_CURRENT_BOARD:
      return {
        ...state,
        currentBoard: action.payload,
      };
    case LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
