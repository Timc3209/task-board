import { LOGIN_SUCCESS, LOGOUT, SET_CURRENT_BOARD, AuthState } from "../types";

export const loginSuccess = (payload: AuthState) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setCurrentBoard = (payload: string) => {
  return {
    type: SET_CURRENT_BOARD,
    payload,
  };
};
