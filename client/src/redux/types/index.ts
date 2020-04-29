export * from "./authTypes";
export * from "./taskTypes";

export interface AuthState {
  loggedIn: boolean;
  token: string;
}

export interface taskState {
  boards: [];
}

export interface MainState {
  auth: AuthState;
  task: taskState;
}
