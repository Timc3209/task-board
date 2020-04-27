import { LOGIN_SUCCESS, LOGOUT, AuthState } from "../types";

const INITIAL_STATE: AuthState = {
  loggedIn: false,
  token: "",
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGOUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
