/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogoutAction } from "../types";
export const LOAD_BOARDS = "LOAD_BOARDS";
export const LOAD_BOARD = "LOAD_BOARD";
export const ADD_BOARD = "ADD_BOARD";
export const EDIT_BOARD = "EDIT_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const ADD_LIST = "ADD_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const MOVE_TASK = "MOVE_TASK";

export interface TaskItemState {
  id: string;
  name: string;
  sortOrder: number;
}

export interface TaskListState {
  id: string;
  name: string;
  tasks: Array<TaskItemState>;
}

export interface BoardState {
  id: string;
  name: string;
  taskList: Array<TaskListState>;
}

export interface TaskState {
  boards: Array<BoardState>;
}

interface LoadBoardsAction {
  type: typeof LOAD_BOARDS;
  payload: any;
}

interface LoadBoardAction {
  type: typeof LOAD_BOARD;
  payload: any;
}

interface AddBoardAction {
  type: typeof ADD_BOARD;
  payload: any;
}

interface EditBoardAction {
  type: typeof EDIT_BOARD;
  payload: any;
}

interface DeleteBoardAction {
  type: typeof DELETE_BOARD;
  payload: string;
}

interface AddListAction {
  type: typeof ADD_LIST;
  payload: any;
}

interface EditListAction {
  type: typeof EDIT_LIST;
  payload: any;
}

interface DeleteListAction {
  type: typeof DELETE_LIST;
  payload: any;
}

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: any;
}

interface EditTaskAction {
  type: typeof EDIT_TASK;
  payload: any;
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: any;
}

interface MoveTaskAction {
  type: typeof MOVE_TASK;
  payload: any;
}

export type TaskActionTypes =
  | LoadBoardsAction
  | LoadBoardAction
  | AddBoardAction
  | EditBoardAction
  | DeleteBoardAction
  | AddListAction
  | EditListAction
  | DeleteListAction
  | AddTaskAction
  | EditTaskAction
  | DeleteTaskAction
  | MoveTaskAction
  | LogoutAction;
