import {
  LOGIN_SUCCESS,
  LOGOUT,
  SET_CURRENT_BOARD,
  AuthState,
  AuthActionTypes,
} from "../types";

export const INITIAL_STATE: AuthState = {
  id: "0",
  username: "",
  token: "",
  currentBoardID: "0",
  loggedIn: false,
};

export const INITIAL_STATE_LOGGED: AuthState = {
  id: "demo",
  username: "demo",
  token: "demo",
  currentBoardID: "0",
  loggedIn: true,
};

export function reducer(state = INITIAL_STATE, action: AuthActionTypes) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        token: action.payload.token,
        currentBoardID: action.payload.currentBoardID,
        loggedIn: action.payload.loggedIn,
      };
    case SET_CURRENT_BOARD:
      return {
        ...state,
        currentBoardID: action.payload,
      };
    case LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
