import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import {
  addList,
  editList,
  deleteList,
  addTask,
  editTask,
  deleteTask,
  loadBoard,
  moveTask,
  setDefaultBoard,
} from "../redux/actions";
import { MainState, BoardState } from "../redux/types";
import Header from "../components/Header";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import TaskList from "../components/TaskList";
import CrudModal from "../components/CrudModal";
import { fetchApi } from "../lib/api";

interface Props {
  defaultBoard: string;
  currentBoard: any;
  boards: Array<BoardState>;
  setDefaultBoard: typeof setDefaultBoard;
  addList: typeof addList;
  editList: typeof editList;
  deleteList: typeof deleteList;
  addTask: typeof addTask;
  editTask: typeof editTask;
  deleteTask: typeof deleteTask;
  moveTask: typeof moveTask;
  loadBoard: typeof loadBoard;
}

interface States {
  listID: string;
  listName: string;
  taskID: string;
  taskName: string;
  modalOpen: boolean;
  modalAction: string;
  modalType: string;
}

const getTaskListByID = (currentBoard: any, taskListID: string) => {
  return currentBoard.taskList.filter(
    (taskList: any) => taskList.id === taskListID
  )[0];
};

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (
  source: any,
  destination: any,
  startIndex: any,
  endIndex: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(startIndex, 1);

  destClone.splice(endIndex, 0, removed);

  const result = { sourceItems: sourceClone, destinationItems: destClone };
  return result;
};

class TaskBoard extends React.Component<Props, States> {
  readonly state: States = {
    listID: "0",
    listName: "",
    taskID: "0",
    taskName: "",
    modalOpen: false,
    modalAction: "",
    modalType: "",
  };

  componentDidMount() {
    this.loadDefaultBoard();
  }

  submitModal = () => {
    const { modalAction, modalType } = this.state;

    if (modalType === "Task") {
      if (modalAction === "Delete") {
        this.deleteTask();
      } else if (modalAction === "Edit") {
        this.editTask();
      } else {
        this.createTask();
      }
    } else {
      if (modalAction === "Delete") {
        this.deleteList();
      } else if (modalAction === "Edit") {
        this.editList();
      } else {
        this.createList();
      }
    }
  };

  deleteList = async () => {
    const { currentBoard } = this.props;
    const { listID } = this.state;

    const boardID = currentBoard.id;

    const apiResult = await fetchApi('taskList/' + listID, 'DELETE');

    if(apiResult.status === true) {
      const data = {
        boardID: boardID,
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
      return false;
    }

    const boardID = currentBoard.id;
    const apiResult = await fetchApi('taskList/' + listID, 'PUT', { name: listName });

    if(apiResult.status === true) {
      
      const data = {
        boardID: boardID,
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
      return false;
    }

    const boardID = currentBoard.id;


    const apiResult = await fetchApi('taskList', 'POST', { name: listName, boardID: boardID });

    if (apiResult.status === true) {

      const taskListID = apiResult.taskListID;

      const data = {
        id: taskListID,
        name: listName,
        tasks: [],
      };
  
      this.props.addList({ boardID: boardID, taskList: data });
      this.closeModal();
    }
  };

  deleteTask = async () => {
    const { currentBoard } = this.props;
    const { listID, taskID } = this.state;

    const boardID = currentBoard.id;

    const apiResult = await fetchApi('task/' + taskID, 'DELETE');

    if(apiResult.status === true) {
      const data = {
        boardID: boardID,
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
      return false;
    }

    const boardID = currentBoard.id;

    const apiResult = await fetchApi('task/' + taskID, 'PUT', { name: taskName });

    if(apiResult.status === true) {
      
      const data = {
        boardID: boardID,
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
      return false;
    }

    const boardID = currentBoard.id;

    const apiResult = await fetchApi('task', 'POST', { name: taskName, listID: listID });

    if (apiResult.status === true) {

      const taskID = apiResult.taskID;

      const data = {
        id: taskID,
        name: taskName,
      };
  
      this.props.addTask({ boardID: boardID, listID: listID, task: data });
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

  openDeleteModal = (row: any) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Delete",
      modalType: "List",
      listID: id,
      listName: name,
    });
  };

  openDeleteTaskModal = (row: any, task: any) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Delete",
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
    });
  };

  onChange = (event: any) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({ [key]: value } as any);
  };

  onDefaultBoardChange = (event: any) => {
    const boardID = event.currentTarget.value;
    this.props.setDefaultBoard(boardID);
    this.loadBoard(boardID);
  };

  loadDefaultBoard = () => {
    const { currentBoard } = this.props;
    const boardID = currentBoard.id;
    this.loadBoard(boardID);
  }

  loadBoard = async (boardID: string) => {

    if (boardID === "0") {
      return false;
    }

    const apiResult = await fetchApi('board/' + boardID, 'GET');

    if (apiResult.status === true && apiResult.board) {
      const board = apiResult.board;
      this.props.loadBoard(board);
    }
  };

  onDragEnd = async (result: any) => {
    const { currentBoard } = this.props;
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      console.log("Dropped outside");
      return;
    }

    const boardID = currentBoard.id;
    const sourceID = source.droppableId;
    const destinationID = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const data = {
      sourceID,
      destinationID,
      sourceIndex,
      destinationIndex
    }

    const apiResult = await fetchApi('taskList/updateOrder', 'POST', data);

    if (apiResult.status === true) {
      // same list.
      if (source.droppableId === destination.droppableId) {
        // get tasklist.
        const list = getTaskListByID(currentBoard, destinationID);
        // reorder items.
        const tasks: any = reorder(list.tasks, sourceIndex, destinationIndex);

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

      const sourceList = getTaskListByID(currentBoard, sourceID);
      const destinationList = getTaskListByID(currentBoard, destinationID);

      // new list
      const moveResult = move(
        sourceList.tasks,
        destinationList.tasks,
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
    }
  };

  render() {
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
              value={this.props.defaultBoard}
              selectLabel="Select Board"
              options={this.props.boards}
              onChange={this.onDefaultBoardChange}
            />
          </div>
          <Button color="success" onClick={this.openCreateModal}>
            Create List
          </Button>
        </div>
        <div className="d-flex ml-2">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.props.currentBoard && this.props.currentBoard.taskList &&
              this.props.currentBoard.taskList.map((list: any, index: any) => {
                return (
                  <TaskList
                    index={index}
                    id={list.id}
                    name={list.name}
                    tasks={list.tasks}
                    showEdit={() => this.openEditModal(list)}
                    showDelete={() => this.openDeleteModal(list)}
                    showAddTask={() => this.openCreateTaskModal(list)}
                    showEditTask={(task: any) =>
                      this.openEditTaskModal(list, task)
                    }
                    showDeleteTask={(task: any) =>
                      this.openDeleteTaskModal(list, task)
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

const getBoardByID = (boards: Array<BoardState>, boardID: string) => {
  return boards.filter((board: BoardState) => board.id === boardID)[0];
};

const mapStateToProps = ({ task, auth }: MainState) => {
  const { boards } = task;
  const { defaultBoard } = auth;
  const board = getBoardByID(boards, defaultBoard);
  const currentBoard = (board == null) ? { id: "0", name: "select"} : board

  return { boards, defaultBoard, currentBoard };
};

const mapDispatchToProps = {
  addList,
  editList,
  deleteList,
  addTask,
  editTask,
  deleteTask,
  loadBoard,
  moveTask,
  setDefaultBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
