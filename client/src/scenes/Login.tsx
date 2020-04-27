import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { loginSuccess } from "../redux/actions";
import { MainState } from "../redux/types";

interface Props {
  loggedIn: boolean;
  loginSuccess: typeof loginSuccess;
}

interface States {}

class Login extends React.Component<Props, States> {
  readonly state: States = {};

  checkLogin = () => {
    this.props.loginSuccess("aaa");
  };

  render() {
    return (
      <div className="App">
        <p>Login</p>
        <Button color="success" onClick={this.checkLogin}>
          Login
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
  loginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
