import { ADD_BOARD } from "../types";

export const addBoard = (payload: any) => {
  return {
    type: ADD_BOARD,
    payload,
  };
};
