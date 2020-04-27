import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { logout } from "../redux/actions";
import { MainState } from "../redux/types";

interface Props {
  loggedIn: boolean;
  logout: typeof logout;
}

interface States {}

class TaskBoard extends React.Component<Props, States> {
  readonly state: States = {};

  checkLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div className="App">
        <p>Task Board</p>
        <Button color="success" onClick={this.checkLogout}>
          Logout
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }: MainState) => {
  const { loggedIn } = auth;
  return { loggedIn };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
