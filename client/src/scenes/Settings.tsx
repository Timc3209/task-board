import React from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { logout, addBoard } from "../redux/actions";
import { MainState } from "../redux/types";
import Header from "../components/Header";
import TextInput from "../components/TextInput";

interface Props {
  boards: [];
  logout: typeof logout;
  addBoard: typeof addBoard;
}

interface States {
  boardName: string;
}

class Settings extends React.Component<Props, States> {
  readonly state: States = {
    boardName: "",
  };

  checkLogout = () => {
    this.props.logout();
  };

  createBoard = () => {
    const { boardName } = this.state;

    if (boardName === "") {
      return false;
    }

    const data = {
      name: boardName,
    };

    this.props.addBoard(data);
    this.setState({ boardName: "" });
  };

  onChange = (event: any) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({ [key]: value } as any);
  };

  render() {
    const { boardName } = this.state;
    const { boards } = this.props;
    return (
      <div className="App">
        <Header />
        <h3>Boards </h3>
        <ListGroup>
          {boards.map((row: any, key: any) => (
            <ListGroupItem key={key}>{row.name}</ListGroupItem>
          ))}
        </ListGroup>
        <TextInput
          name="boardName"
          label="Board Name"
          type="text"
          value={boardName}
          onChange={this.onChange}
        />
        <Button color="success" onClick={this.createBoard}>
          Create Board
        </Button>
        <h3>User </h3>
        <Button color="success" onClick={this.checkLogout}>
          Logout
        </Button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
