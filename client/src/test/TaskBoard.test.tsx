import React from "react";
import { createStore } from "redux";
import { createHashHistory } from "history";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import Router from "../Router";
import { AppInitialStateLogged, rootReducer } from "../redux/reducers";
import {
  addBoard,
  setCurrentBoard,
  addList,
  editList,
  deleteList,
  addTask,
} from "../redux/actions";
import { BoardState, TaskListState, TaskActionTypes } from "../redux/types";
import { v4 as uuidv4 } from "uuid";

test("renders lists add/edit/delete", () => {
  const boardID = uuidv4();
  const boardName = uuidv4();
  const itemID = uuidv4();
  const newName = uuidv4();
  const updateName = uuidv4();
  const taskID = uuidv4();
  const taskName = uuidv4();

  const boardItem: BoardState = {
    id: boardID,
    name: boardName,
    taskList: [],
  };

  const item: TaskListState = {
    id: itemID,
    name: newName,
    tasks: [],
  };

  const data = {
    boardID: boardID,
    taskList: item,
  };

  const taskData = {
    id: taskID,
    name: taskName,
  };

  const store = createStore(rootReducer, AppInitialStateLogged);
  const history = createHashHistory();
  history.push("/taskBoard");

  const { getByText, queryByText } = render(
    <Provider store={store}>
      <Router loggedIn={true} />
    </Provider>
  );

  const titleElement = getByText("Select Board");
  expect(titleElement).toBeInTheDocument();

  store.dispatch(addBoard(boardItem) as TaskActionTypes);
  store.dispatch(setCurrentBoard(boardID) as TaskActionTypes);

  const boardCheck = getByText(boardName);
  expect(boardCheck).toBeInTheDocument();

  store.dispatch(addList(data) as TaskActionTypes);

  const newCheck = getByText(newName);
  expect(newCheck).toBeInTheDocument();

  store.dispatch(
    addTask({
      boardID: boardID,
      listID: itemID,
      task: taskData,
    }) as TaskActionTypes
  );

  const taskCheck = getByText(taskName);
  expect(taskCheck).toBeInTheDocument();

  data.taskList.name = updateName;

  store.dispatch(editList(data) as TaskActionTypes);

  const editCheck = getByText(updateName);
  expect(editCheck).toBeInTheDocument();

  store.dispatch(
    deleteList({
      boardID: boardID,
      id: itemID,
    }) as TaskActionTypes
  );

  const deleteCheck = queryByText(updateName);
  expect(deleteCheck).not.toBeInTheDocument();
});
