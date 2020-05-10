export * from "./authTypes";
export * from "./taskTypes";

export interface TaskItemState {
  id: string;
  name: string;
  sortOrder: number,
}

export interface TaskListState {
  id: string;
  name: string;
  tasks?: Array<TaskItemState>;
}

export interface BoardState {
  id: string;
  name: string;
  taskList?: Array<TaskListState>;
}

export interface AuthState {
  loggedIn: boolean;
  token: string;
  defaultBoard: string;
}

export interface TaskState {
  boards: Array<BoardState>;
}

export interface MainState {
  auth: AuthState;
  task: TaskState;
}
