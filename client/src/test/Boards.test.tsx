import React from "react";
import { createStore } from "redux";
import { createHashHistory } from "history";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import Router from "../Router";
import { AppInitialStateLogged, rootReducer } from "../redux/reducers";
import { addBoard, editBoard, deleteBoard } from "../redux/actions";
import { BoardState, TaskActionTypes } from "../redux/types";
import { v4 as uuidv4 } from "uuid";

test("renders boards add/edit/delete", () => {
  const itemID = uuidv4();
  const newName = uuidv4();
  const updateName = uuidv4();

  const item: BoardState = {
    id: itemID,
    name: newName,
    taskList: [],
  };

  const store = createStore(rootReducer, AppInitialStateLogged);
  const history = createHashHistory();
  history.push("/boards");

  const { getByText, queryByText } = render(
    <Provider store={store}>
      <Router loggedIn={true} />
    </Provider>
  );

  const titleElement = getByText("Create Board");
  expect(titleElement).toBeInTheDocument();

  store.dispatch(addBoard(item) as TaskActionTypes);

  const newCheck = getByText(newName);
  expect(newCheck).toBeInTheDocument();

  item.name = updateName;

  store.dispatch(editBoard(item) as TaskActionTypes);

  const editCheck = getByText(updateName);
  expect(editCheck).toBeInTheDocument();

  store.dispatch(deleteBoard(itemID) as TaskActionTypes);

  const deleteCheck = queryByText(updateName);
  expect(deleteCheck).not.toBeInTheDocument();
});
