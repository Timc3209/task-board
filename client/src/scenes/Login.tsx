import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { loginSuccess } from "../redux/actions";
import { AuthState } from "../redux/types";
import { AppState } from "../redux/reducers";
import TextInput from "../components/TextInput";
import { fetchData } from "../lib/api";

interface Props {
  loggedIn: boolean;
  loginSuccess: typeof loginSuccess;
}

interface States {
  username: string;
  password: string;
  showError: boolean;
  errorInput: string;
  errorMessage: string;
}

class Login extends React.Component<Props, States> {
  readonly state: States = {
    username: "demo",
    password: "demo",
    showError: false,
    errorInput: "",
    errorMessage: "",
  };

  checkLogin = async () => {
    const { username, password } = this.state;

    if (username === "") {
      this.setState({
        showError: true,
        errorInput: "username",
        errorMessage: "Please enter username",
      });
      return false;
    }
    if (password === "") {
      this.setState({
        showError: true,
        errorInput: "password",
        errorMessage: "Please enter password",
      });
      return false;
    }

    const apiResult = await fetchData("auth/login", "POST", {
      username,
      password,
    });

    if (apiResult.status === true) {
      const { user, token } = apiResult;
      const authData: AuthState = {
        id: user.id,
        username: user.name,
        token: token,
        currentBoardID: user.currentBoard ? user.currentBoard : "0",
        loggedIn: true,
      };
      this.props.loginSuccess(authData);
      return true;
    }
    this.setState({
      showError: true,
      errorInput: "password",
      errorMessage: "Invalid username or password",
    });
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState<never>({ [key]: value, showError: false });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-form">
        <h1 className="pb-4">
          <span className="font-weight-bold">Task Board</span>
        </h1>
        <TextInput
          name="username"
          label="Username"
          type="text"
          value={username}
          onChange={this.onChange}
          showError={
            this.state.errorInput === "username" && this.state.showError
          }
          errorMessage={this.state.errorMessage}
        />
        <TextInput
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={this.onChange}
          showError={
            this.state.errorInput === "password" && this.state.showError
          }
          errorMessage={this.state.errorMessage}
        />
        <Button
          className="btn-lg btn-dark btn-block mt-4"
          onClick={this.checkLogin}
        >
          Login
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }: AppState) => {
  const { loggedIn } = auth;
  return { loggedIn };
};

const mapDispatchToProps = {
  loginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
