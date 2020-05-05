import { ADD_BOARD, EDIT_BOARD, DELETE_BOARD, LOAD_TASK } from "../types";

export const addBoard = (payload: any) => {
  return {
    type: ADD_BOARD,
    payload,
  };
};

export const editBoard = (payload: any) => {
  return {
    type: EDIT_BOARD,
    payload,
  };
};

export const deleteBoard = (payload: any) => {
  return {
    type: DELETE_BOARD,
    payload,
  };
};

export const loadTask = (payload: any) => {
  return {
    type: LOAD_TASK,
    payload,
  };
};
