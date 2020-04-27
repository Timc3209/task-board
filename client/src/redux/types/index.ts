export * from "./authTypes";

export interface AuthState {
  loggedIn: boolean;
  token: string;
}

export interface MainState {
  auth: AuthState;
}
