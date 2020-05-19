import { combineReducers } from "redux";
import * as authReducer from "./authReducer";
import * as taskReducer from "./taskReducer";
import { AuthState, TaskState } from "../types";

export interface AppState {
  auth: AuthState;
  task: TaskState;
}

export const AppInitialState: AppState = {
  auth: authReducer.INITIAL_STATE,
  task: taskReducer.INITIAL_STATE,
};

export const AppInitialStateLogged: AppState = {
  auth: authReducer.INITIAL_STATE_LOGGED,
  task: taskReducer.INITIAL_STATE,
};

export const rootReducer = combineReducers({
  auth: authReducer.reducer,
  task: taskReducer.reducer,
});
