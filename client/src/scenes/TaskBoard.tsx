import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { DragDropContext } from "react-beautiful-dnd";
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
import { MainState, BoardState } from "../redux/types";
import Header from "../components/Header";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import TaskList from "../components/TaskList";
import CrudModal from "../components/CrudModal";
import { fetchApi } from "../lib/api";
import { reorderArray, moveArray } from "../lib/tools";

interface Props {
  currentBoard: string;
  taskLists: any;
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
    const { currentBoard } = this.props;
    const { listID } = this.state;

    const apiResult = await fetchApi("taskList/" + listID, "DELETE");

    if (apiResult.status === true) {
      const data = {
        boardID: currentBoard,
        id: listID,
      };
      this.props.deleteList(data);
      this.closeModal();
    }
  };

  editList = async () => {
    const { currentBoard } = this.props;
    const { listID, listName } = this.state;

    if (listName === "") {
      this.setState({ showError: true });
      return false;
    }

    const apiResult = await fetchApi("taskList/" + listID, "PUT", {
      name: listName,
    });

    if (apiResult.status === true) {
      const data = {
        boardID: currentBoard,
        id: listID,
        name: listName,
      };

      this.props.editList(data);
      this.closeModal();
    }
  };

  createList = async () => {
    const { currentBoard } = this.props;
    const { listName } = this.state;

    if (listName === "") {
      this.setState({ showError: true });
      return false;
    }

    const apiResult = await fetchApi("taskList", "POST", {
      name: listName,
      boardID: currentBoard,
    });

    if (apiResult.status === true) {
      const taskListID = apiResult.taskListID;

      const data = {
        id: taskListID,
        name: listName,
        tasks: [],
      };

      this.props.addList({ boardID: currentBoard, taskList: data });
      this.closeModal();
    }
  };

  deleteTask = async () => {
    const { currentBoard } = this.props;
    const { listID, taskID } = this.state;

    const apiResult = await fetchApi("task/" + taskID, "DELETE");

    if (apiResult.status === true) {
      const data = {
        boardID: currentBoard,
        listID: listID,
        id: taskID,
      };
      this.props.deleteTask(data);
      this.closeModal();
    }
  };

  editTask = async () => {
    const { currentBoard } = this.props;
    const { listID, taskID, taskName } = this.state;

    if (taskName === "") {
      this.setState({ showError: true });
      return false;
    }

    const apiResult = await fetchApi("task/" + taskID, "PUT", {
      name: taskName,
    });

    if (apiResult.status === true) {
      const data = {
        boardID: currentBoard,
        listID: listID,
        id: taskID,
        name: taskName,
      };

      this.props.editTask(data);
      this.closeModal();
    }
  };

  createTask = async () => {
    const { currentBoard } = this.props;
    const { listID, taskName } = this.state;

    if (taskName === "") {
      this.setState({ showError: true });
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

      this.props.addTask({ boardID: currentBoard, listID: listID, task: data });
      this.closeModal();
    }
  };

  openCreateModal = () => {
    this.setState({
      modalOpen: true,
      modalAction: "Create",
      modalType: "List",
    });
  };

  openCreateTaskModal = (row: any) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Create",
      modalType: "Task",
      listID: id,
      listName: name,
    });
  };

  openEditModal = (row: any) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Edit",
      modalType: "List",
      listID: id,
      listName: name,
    });
  };

  openEditTaskModal = (row: any, task: any) => {
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
    });
  };

  onChange = (event: any) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({ [key]: value } as any);
  };

  onDefaultBoardChange = (event: any) => {
    const boardID = event.currentTarget.value;
    this.props.setCurrentBoard(boardID);
    this.loadBoard(boardID);
  };

  loadDefaultBoard = () => {
    const { currentBoard } = this.props;
    this.loadBoard(currentBoard);
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

  onDragEnd = (result: any) => {
    const { currentBoard, taskLists } = this.props;
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      console.log("Dropped outside");
      return;
    }

    const boardID = currentBoard;
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
      const list = getTasks(taskLists, destinationID);
      // reorder items.
      const tasks: any = reorderArray(list, sourceIndex, destinationIndex);

      // update redux
      this.props.moveTask({
        boardID: boardID,
        id: destinationID,
        tasks: tasks,
      });

      console.log(tasks);
      console.log(this.props.boards);
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

    const { sourceItems, destinationItems }: any = moveResult;

    // update redux source items
    this.props.moveTask({
      boardID: boardID,
      id: sourceID,
      tasks: sourceItems,
    });

    // update redux destination items
    this.props.moveTask({
      boardID: boardID,
      id: destinationID,
      tasks: destinationItems,
    });

    fetchApi("taskList/updateOrder", "POST", data);
  };

  render() {
    const { boards, currentBoard, taskLists } = this.props;
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
              value={currentBoard}
              selectLabel="Select Board"
              options={boards}
              onChange={this.onDefaultBoardChange}
            />
          </div>
          {this.props.currentBoard !== "0" && (
            <Button color="success" onClick={this.openCreateModal}>
              Create List
            </Button>
          )}
        </div>
        <div className="d-flex ml-2">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {taskLists &&
              taskLists.map((list: any, index: any) => {
                return (
                  <TaskList
                    key={index}
                    id={list.id}
                    name={list.name}
                    tasks={list.tasks}
                    showEdit={() => this.openEditModal(list)}
                    showAddTask={() => this.openCreateTaskModal(list)}
                    showEditTask={(task: any) =>
                      this.openEditTaskModal(list, task)
                    }
                  />
                );
              })}
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
          {modalAction === "Delete" ? (
            <p>
              {modalType} {modalType === "List" ? listName : taskName}
            </p>
          ) : (
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
                    errorMessage="Please enter a name"
                  />
                </div>
              )}
            </div>
          )}
        </CrudModal>
      </div>
    );
  }
}

const getTasks = (taskLists: any, taskListID: string) => {
  const row = taskLists.filter(
    (taskList: any) => taskList.id === taskListID
  )[0];
  const tasks = row == null ? [] : row.tasks;
  return tasks;
};

const getTaskLists = (boards: Array<BoardState>, boardID: string) => {
  const row = boards.filter((board: BoardState) => board.id === boardID)[0];
  const taskLists = row == null ? [] : row.taskList;
  return taskLists;
};

const mapStateToProps = ({ task, auth }: MainState) => {
  const { boards } = task;
  const { currentBoard } = auth;
  const taskLists = getTaskLists(boards, currentBoard);

  return { boards, currentBoard, taskLists };
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
