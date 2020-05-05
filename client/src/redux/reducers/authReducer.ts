import { LOGIN_SUCCESS, LOGOUT, SET_DEFAULT_BOARD, AuthState } from "../types";

const INITIAL_STATE: AuthState = {
  loggedIn: false,
  token: "",
  defaultBoard: "0",
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case SET_DEFAULT_BOARD:
      return {
        ...state,
        defaultBoard: action.payload,
      };
    case LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
