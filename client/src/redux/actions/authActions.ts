import { LOGIN_SUCCESS, LOGOUT } from "../types";

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
