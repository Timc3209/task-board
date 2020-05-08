import {
  ADD_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
  ADD_LIST,
  EDIT_LIST,
  DELETE_LIST,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  LOAD_TASK,
  MOVE_TASK,
} from "../types";

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

export const addList = (payload: any) => {
  return {
    type: ADD_LIST,
    payload,
  };
};

export const editList = (payload: any) => {
  return {
    type: EDIT_LIST,
    payload,
  };
};

export const deleteList = (payload: any) => {
  return {
    type: DELETE_LIST,
    payload,
  };
};

export const addTask = (payload: any) => {
  return {
    type: ADD_TASK,
    payload,
  };
};

export const editTask = (payload: any) => {
  return {
    type: EDIT_TASK,
    payload,
  };
};

export const deleteTask = (payload: any) => {
  return {
    type: DELETE_TASK,
    payload,
  };
};

export const loadTask = (payload: any) => {
  return {
    type: LOAD_TASK,
    payload,
  };
};

export const moveTask = (payload: any) => {
  return {
    type: MOVE_TASK,
    payload,
  };
};
