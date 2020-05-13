import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { loadBoards, addBoard, editBoard, deleteBoard } from "../redux/actions";
import { MainState, BoardState } from "../redux/types";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import CrudModal from "../components/CrudModal";
import { fetchApi } from "../lib/api";

interface Props {
  boards: Array<BoardState>;
  loadBoards: typeof loadBoards;
  addBoard: typeof addBoard;
  editBoard: typeof editBoard;
  deleteBoard: typeof deleteBoard;
}

interface States {
  boardID: string;
  boardName: string;
  modalOpen: boolean;
  modalAction: string;
  showError: boolean;
  errorMessage: string;
}

class Boards extends React.Component<Props, States> {
  readonly state: States = {
    boardID: "0",
    boardName: "",
    modalOpen: false,
    modalAction: "",
    showError: false,
    errorMessage: "",
  };

  componentDidMount() {
    this.loadBoards();
  }

  loadBoards = async () => {
    const apiResult = await fetchApi("board", "GET");

    if (apiResult.status === true) {
      const boards = apiResult.boards;
      this.props.loadBoards(boards);
    }
  };

  submitModal = () => {
    const { modalAction } = this.state;

    if (modalAction === "Delete") {
      this.deleteBoard();
    } else if (modalAction === "Edit") {
      this.editBoard();
    } else {
      this.createBoard();
    }
  };

  deleteBoard = async () => {
    const { boardID } = this.state;
    this.props.deleteBoard({ id: boardID });
    const apiResult = await fetchApi("board/" + boardID, "DELETE");

    if (apiResult.status === true) {
      this.props.deleteBoard({ id: boardID });
      this.closeModal();
      return true;
    }
    this.setState({ showError: true, errorMessage: "Please try again" });
  };

  editBoard = async () => {
    const { boardID, boardName } = this.state;

    if (boardName === "") {
      this.setState({ showError: true, errorMessage: "Please enter name" });
      return false;
    }

    const data = {
      id: boardID,
      name: boardName,
    };

    // send to api
    const apiResult = await fetchApi("board/" + boardID, "PUT", data);

    if (apiResult.status === true) {
      this.props.editBoard(data);
      this.closeModal();
      return true;
    }
    this.setState({ showError: true, errorMessage: "Board name in use" });
  };

  createBoard = async () => {
    const { boardName } = this.state;

    if (boardName === "") {
      this.setState({ showError: true, errorMessage: "Please enter name" });
      return false;
    }

    const apiResult = await fetchApi("board", "POST", { name: boardName });

    if (apiResult.status === true) {
      const boardID = apiResult.boardID;

      const data = {
        id: boardID,
        name: boardName,
        taskList: [],
      };

      this.props.addBoard(data);
      this.closeModal();
      return true;
    }
    this.setState({ showError: true, errorMessage: "Board name in use" });
  };

  onChange = (event: any) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({ [key]: value } as any);
  };

  openCreateModal = () => {
    this.setState({ modalOpen: true, modalAction: "Create" });
  };

  openEditModal = (row: any) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Edit",
      boardID: id,
      boardName: name,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      boardName: "",
      boardID: "0",
      showError: false,
      errorMessage: "",
    });
  };

  actionsFormatter = (cell: any, row: any) => {
    return (
      <div className="btn-actions">
        <Button
          outline
          color="primary"
          size="sm"
          onClick={() => this.openEditModal(row)}
        >
          Edit
        </Button>
      </div>
    );
  };

  render() {
    const { boardName, modalOpen, modalAction } = this.state;
    const { boards } = this.props;
    const columns = [
      {
        dataField: "name",
        text: "Board Name",
        sort: true,
      },
      {
        dataField: "actions",
        text: "Actions",
        isDummyField: true,
        formatter: this.actionsFormatter,
        headerStyle: () => {
          return { width: "130px", "text-align": "center" };
        },
      },
    ];

    return (
      <div className="App">
        <Header />
        <div className="section">
          <div className="d-inline-block mb-2">
            <h3>Boards </h3>
          </div>
          <Button
            color="success"
            className="float-right"
            onClick={this.openCreateModal}
          >
            Create Board
          </Button>
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={boards}
            columns={columns}
          />
        </div>
        <CrudModal
          modalOpen={modalOpen}
          modalAction={modalAction}
          modalType="Board"
          deleteAction={this.deleteBoard}
          submitModal={this.submitModal}
          closeModal={this.closeModal}
        >
          {modalAction === "Delete" ? (
            <p>Board: {boardName}</p>
          ) : (
            <TextInput
              name="boardName"
              label="Board Name"
              type="text"
              value={boardName}
              onChange={this.onChange}
              showError={this.state.showError}
              errorMessage={this.state.errorMessage}
            />
          )}
        </CrudModal>
      </div>
    );
  }
}

const mapStateToProps = ({ task }: MainState) => {
  const { boards } = task;
  return { boards };
};

const mapDispatchToProps = {
  loadBoards,
  addBoard,
  editBoard,
  deleteBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
