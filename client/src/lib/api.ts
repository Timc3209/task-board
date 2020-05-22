import { store } from "../redux/store";
import { logout } from "../redux/actions";
const apiUrl = "/api/";

export const fetchApi = async (
  endPoint: string,
  method: string,
  data: object = {}
) => {
  try {
    const state = store.getState();
    const authToken = state.auth.token;

    if (authToken == null || authToken === "") {
      store.dispatch(logout());
      return { status: false, error: "not logged in" };
    }
    const bodyData =
      method === "POST" || method === "PUT"
        ? { body: JSON.stringify(data) }
        : {};

    const response = await fetch(apiUrl + endPoint, {
      method: method,
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      ...bodyData,
    });

    // Invalid token, logout user.
    if (response.status === 401) {
      store.dispatch(logout());
      return { status: false, error: "Not logged" };
    }
    return await response.json();
  } catch (err) {
    console.log(err);
    if (err.error) {
      return { status: false, error: err.error };
    }
    return { status: false, error: "" };
  }
};

export const fetchData = async (
  endPoint: string,
  method: string,
  data: object = {}
) => {
  try {
    const bodyData =
      method === "POST" || method === "PUT"
        ? { body: JSON.stringify(data) }
        : {};

    const response = await fetch(apiUrl + endPoint, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...bodyData,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    if (err.error) {
      return { status: false, error: err.error };
    }
    return { status: false, error: "" };
  }
};
