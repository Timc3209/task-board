import { LOGIN_SUCCESS, LOGOUT, SET_DEFAULT_BOARD } from "../types";

export const loginSuccess = (payload: any) => {
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

export const setDefaultBoard = (payload: any) => {
  return {
    type: SET_DEFAULT_BOARD,
    payload,
  };
};
