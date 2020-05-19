import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  addList,
  editList,
  deleteList,
  addTask,
  editTask,
  deleteTask,
  loadBoard,
  loadBoards,
  moveTask,
  setCurrentBoard,
} from "../redux/actions";
import { BoardState, TaskListState, TaskItemState } from "../redux/types";
import { AppState } from "../redux/reducers";
import Header from "../components/Header";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import TaskList from "../components/TaskList";
import CrudModal from "../components/CrudModal";
import { fetchApi } from "../lib/api";
import { reorderArray, moveArray } from "../lib/tools";

interface Props {
  currentBoardID: string;
  currentBoard: BoardState;
  boards: Array<BoardState>;
  setCurrentBoard: typeof setCurrentBoard;
  addList: typeof addList;
  editList: typeof editList;
  deleteList: typeof deleteList;
  addTask: typeof addTask;
  editTask: typeof editTask;
  deleteTask: typeof deleteTask;
  moveTask: typeof moveTask;
  loadBoard: typeof loadBoard;
  loadBoards: typeof loadBoards;
}

interface States {
  listID: string;
  listName: string;
  taskID: string;
  taskName: string;
  modalOpen: boolean;
  modalAction: string;
  modalType: string;
  showError: boolean;
  errorMessage: string;
}

class TaskBoard extends React.Component<Props, States> {
  readonly state: States = {
    listID: "0",
    listName: "",
    taskID: "0",
    taskName: "",
    modalOpen: false,
    modalAction: "",
    modalType: "",
    showError: false,
    errorMessage: "",
  };

  componentDidMount() {
    this.loadDefaultBoard();
  }

  submitModal = () => {
    const { modalAction, modalType } = this.state;

    if (modalType === "Task") {
      if (modalAction === "Edit") {
        this.editTask();
      } else {
        this.createTask();
      }
    } else {
      if (modalAction === "Edit") {
        this.editList();
      } else {
        this.createList();
      }
    }
  };

  deleteList = async () => {
    const { currentBoardID } = this.props;
    const { listID } = this.state;

    const apiResult = await fetchApi("taskList/" + listID, "DELETE");

    if (apiResult.status === true) {
      const data = {
        boardID: currentBoardID,
        id: listID,
      };
      this.props.deleteList(data);
      this.closeModal();
      return true;
    }
    this.setState({ showError: true, errorMessage: "Please try again" });
  };

  editList = async () => {
    const { currentBoardID } = this.props;
    const { listID, listName } = this.state;

    if (listName === "") {
      this.setState({ showError: true, errorMessage: "Please enter name" });
      return false;
    }

    const apiResult = await fetchApi("taskList/" + listID, "PUT", {
      name: listName,
    });

    if (apiResult.status === true) {
      const data = {
        id: listID,
        name: listName,
        tasks: [],
      };

      this.props.editList({ boardID: currentBoardID, taskList: data });
      this.closeModal();
      return true;
    }
    this.setState({ showError: true, errorMessage: "Please try again" });
  };

  createList = async () => {
    const { currentBoardID } = this.props;
    const { listName } = this.state;

    if (listName === "") {
      this.setState({ showError: true, errorMessage: "Please enter name" });
      return false;
    }

    const apiResult = await fetchApi("taskList", "POST", {
      name: listName,
      boardID: currentBoardID,
    });

    if (apiResult.status === true) {
      const taskListID = apiResult.taskListID;

      const data = {
        id: taskListID,
        name: listName,
        tasks: [],
      };

      this.props.addList({ boardID: currentBoardID, taskList: data });
      this.closeModal();
      return true;
    }
    this.setState({ showError: true, errorMessage: "Please try again" });
  };

  deleteTask = async () => {
    const { currentBoardID } = this.props;
    const { listID, taskID } = this.state;

    const apiResult = await fetchApi("task/" + taskID, "DELETE");

    if (apiResult.status === true) {
      const data = {
        boardID: currentBoardID,
        listID: listID,
        id: taskID,
      };
      this.props.deleteTask(data);
      this.closeModal();
      return true;
    }

    this.setState({ showError: true, errorMessage: "Please try again" });
  };

  editTask = async () => {
    const { currentBoardID } = this.props;
    const { listID, taskID, taskName } = this.state;

    if (taskName === "") {
      this.setState({ showError: true, errorMessage: "Please enter name" });
      return false;
    }

    const apiResult = await fetchApi("task/" + taskID, "PUT", {
      name: taskName,
    });

    if (apiResult.status === true) {
      const data = {
        boardID: currentBoardID,
        listID: listID,
        id: taskID,
        name: taskName,
      };

      this.props.editTask(data);
      this.closeModal();
      return true;
    }
    this.setState({ showError: true, errorMessage: "Please try again" });
  };

  createTask = async () => {
    const { currentBoardID } = this.props;
    const { listID, taskName } = this.state;

    if (taskName === "") {
      this.setState({ showError: true, errorMessage: "Please enter name" });
      return false;
    }

    const apiResult = await fetchApi("task", "POST", {
      name: taskName,
      listID: listID,
    });

    if (apiResult.status === true) {
      const taskID = apiResult.taskID;

      const data = {
        id: taskID,
        name: taskName,
      };

      this.props.addTask({
        boardID: currentBoardID,
        listID: listID,
        task: data,
      });
      this.closeModal();
      return true;
    }
    this.setState({ showError: true, errorMessage: "Please try again" });
  };

  openCreateModal = () => {
    this.setState({
      modalOpen: true,
      modalAction: "Create",
      modalType: "List",
    });
  };

  openCreateTaskModal = (row: TaskListState) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Create",
      modalType: "Task",
      listID: id,
      listName: name,
    });
  };

  openEditModal = (row: TaskListState) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Edit",
      modalType: "List",
      listID: id,
      listName: name,
    });
  };

  openEditTaskModal = (row: TaskListState, task: TaskItemState) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Edit",
      modalType: "Task",
      listID: id,
      listName: name,
      taskID: task.id,
      taskName: task.name,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalType: "",
      listName: "",
      listID: "0",
      taskID: "0",
      taskName: "",
      showError: false,
      errorMessage: "",
    });
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState<never>({ [key]: value });
  };

  onDefaultBoardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const boardID = event.currentTarget.value;
    this.props.setCurrentBoard(boardID);
    this.loadBoard(boardID);
  };

  loadDefaultBoard = () => {
    const { currentBoardID } = this.props;
    this.loadBoard(currentBoardID);
  };

  loadBoard = async (boardID: string) => {
    if (boardID === "0") {
      this.loadBoards();
      return false;
    }

    const apiResult = await fetchApi("board/" + boardID, "GET");

    if (apiResult.status === true && apiResult.board) {
      const board = apiResult.board;
      this.props.loadBoard(board);
    }
  };

  loadBoards = async () => {
    const apiResult = await fetchApi("board", "GET");

    if (apiResult.status === true) {
      const boards = apiResult.boards;
      this.props.loadBoards(boards);
    }
  };

  onDragEnd = (result: DropResult) => {
    const { currentBoardID, currentBoard } = this.props;
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      console.log("Dropped outside");
      return;
    }

    const taskLists = currentBoard.taskList;
    const sourceID = source.droppableId;
    const destinationID = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const data = {
      sourceID,
      destinationID,
      sourceIndex,
      destinationIndex,
    };

    // same list.
    if (source.droppableId === destination.droppableId) {
      // get tasklist.
      const tasks = getTasks(taskLists, destinationID);
      // reorder items.
      const newTasks = reorderArray(tasks, sourceIndex, destinationIndex);
      // update redux
      this.props.moveTask({
        boardID: currentBoardID,
        id: destinationID,
        tasks: newTasks,
      });

      fetchApi("taskList/updateOrder", "POST", data);
      return;
    }

    const sourceList = getTasks(taskLists, sourceID);
    const destinationList = getTasks(taskLists, destinationID);

    // new list
    const moveResult = moveArray(
      sourceList,
      destinationList,
      sourceIndex,
      destinationIndex
    );

    const { sourceItems, destinationItems } = moveResult;

    // update redux source items
    this.props.moveTask({
      boardID: currentBoardID,
      id: sourceID,
      tasks: sourceItems,
    });

    // update redux destination items
    this.props.moveTask({
      boardID: currentBoardID,
      id: destinationID,
      tasks: destinationItems,
    });

    fetchApi("taskList/updateOrder", "POST", data);
  };

  render() {
    const { boards, currentBoardID, currentBoard } = this.props;
    const {
      listName,
      taskName,
      modalOpen,
      modalAction,
      modalType,
    } = this.state;
    return (
      <div className="App">
        <Header />
        <div className="board-tools">
          <div className="select-board">
            <SelectInput
              name="defaultBoard"
              label="Board Name"
              value={currentBoardID}
              selectLabel="Select Board"
              options={boards}
              onChange={this.onDefaultBoardChange}
            />
          </div>
          {this.props.currentBoardID !== "0" && (
            <Button color="success" onClick={this.openCreateModal}>
              Create List
            </Button>
          )}
        </div>
        <div className="d-flex ml-2">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {currentBoard &&
              currentBoard.taskList &&
              currentBoard.taskList.map(
                (list: TaskListState, index: number) => {
                  return (
                    <TaskList
                      key={index}
                      id={list.id}
                      name={list.name}
                      tasks={list.tasks}
                      showEdit={() => this.openEditModal(list)}
                      showAddTask={() => this.openCreateTaskModal(list)}
                      showEditTask={(task: TaskItemState) =>
                        this.openEditTaskModal(list, task)
                      }
                    />
                  );
                }
              )}
          </DragDropContext>
        </div>
        <CrudModal
          modalOpen={modalOpen}
          modalAction={modalAction}
          modalType={modalType}
          deleteAction={
            modalType === "List" ? this.deleteList : this.deleteTask
          }
          submitModal={this.submitModal}
          closeModal={this.closeModal}
        >
          <div>
            {modalType === "List" ? (
              <div>
                <TextInput
                  name="listName"
                  label="List Name"
                  type="text"
                  value={listName}
                  onChange={this.onChange}
                  showError={this.state.showError}
                  errorMessage="Please enter a name"
                />
              </div>
            ) : (
              <div>
                <p>List {listName}</p>
                <TextInput
                  name="taskName"
                  label="Task Name"
                  type="text"
                  value={taskName}
                  onChange={this.onChange}
                  showError={this.state.showError}
                  errorMessage={this.state.errorMessage}
                />
              </div>
            )}
          </div>
        </CrudModal>
      </div>
    );
  }
}

const getTasks = (taskLists: Array<TaskListState>, taskListID: string) => {
  const row = taskLists.filter(
    (taskList: TaskListState) => taskList.id === taskListID
  )[0];
  const tasks = row == null ? [] : row.tasks;
  return tasks;
};

const getCurrentBoard = (boards: Array<BoardState>, boardID: string) => {
  const currentBoard = boards.filter(
    (board: BoardState) => board.id === boardID
  )[0];
  return currentBoard;
};

const mapStateToProps = ({ task, auth }: AppState) => {
  const { boards } = task;
  const { currentBoardID } = auth;
  const currentBoard = getCurrentBoard(boards, currentBoardID);

  return { boards, currentBoardID, currentBoard };
};

const mapDispatchToProps = {
  addList,
  editList,
  deleteList,
  addTask,
  editTask,
  deleteTask,
  loadBoard,
  loadBoards,
  moveTask,
  setCurrentBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
