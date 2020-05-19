export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD";

export interface AuthState {
  id: string;
  username: string;
  token: string;
  currentBoardID: string;
  loggedIn: boolean;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: AuthState;
}

interface SetCurrentBoardAction {
  type: typeof SET_CURRENT_BOARD;
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | LoginSuccessAction
  | LogoutAction
  | SetCurrentBoardAction;
