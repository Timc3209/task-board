import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { v4 as uuidv4 } from "uuid";
import { logout, addBoard, editBoard, deleteBoard } from "../redux/actions";
import { MainState, BoardState } from "../redux/types";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import CrudModal from "../components/CrudModal";

interface Props {
  boards: Array<BoardState>;
  addBoard: typeof addBoard;
  editBoard: typeof editBoard;
  deleteBoard: typeof deleteBoard;
}

interface States {
  boardID: string;
  boardName: string;
  modalOpen: boolean;
  modalAction: string;
}

class Boards extends React.Component<Props, States> {
  readonly state: States = {
    boardID: "0",
    boardName: "",
    modalOpen: false,
    modalAction: "",
  };

  submitModal = () => {
    const { boardName, modalAction } = this.state;

    if (modalAction === "Delete") {
      this.deleteBoard();
    } else if (modalAction === "Edit") {
      this.editBoard();
    } else {
      this.createBoard();
    }
  };

  deleteBoard = () => {
    const { boardID } = this.state;
    this.props.deleteBoard({ id: boardID });
    this.closeModal();
  };

  editBoard = () => {
    const { boardID, boardName } = this.state;

    if (boardName === "") {
      return false;
    }

    const data: BoardState = {
      id: boardID,
      name: boardName,
    };

    this.props.editBoard(data);
    this.closeModal();
  };

  createBoard = () => {
    const { boardName } = this.state;

    if (boardName === "") {
      return false;
    }

    const id = uuidv4();

    const data: BoardState = {
      id: id,
      name: boardName,
      taskList: [],
    };

    this.props.addBoard(data);
    this.closeModal();
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

  openDeleteModal = (row: any) => {
    const { id, name } = row;
    this.setState({
      modalOpen: true,
      modalAction: "Delete",
      boardID: id,
      boardName: name,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      boardName: "",
      boardID: "0",
    });
  };

  actionsFormatter = (cell: any, row: any) => {
    return (
      <div className="btn-actions">
        <Button
          outline
          color="primary"
          size="sm"
          className="mr-3"
          onClick={() => this.openEditModal(row)}
        >
          Edit
        </Button>
        <Button
          outline
          color="danger"
          size="sm"
          onClick={() => this.openDeleteModal(row)}
        >
          Delete
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
          return { width: "160px", "text-align": "center" };
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
  logout,
  addBoard,
  editBoard,
  deleteBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
