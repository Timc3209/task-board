import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { loginSuccess } from "../redux/actions";
import { MainState } from "../redux/types";
import TextInput from "../components/TextInput";

interface Props {
  loggedIn: boolean;
  loginSuccess: typeof loginSuccess;
}

interface States {
  username: string;
  password: string;
}

class Login extends React.Component<Props, States> {
  readonly state: States = {
    username: "demo",
    password: "demo",
  };

  checkLogin = () => {
    const { username, password } = this.state;

    if (username === "demo" && password === "demo") {
      this.props.loginSuccess("demo");
      return true;
    }

    // show fail
  };

  onChange = (event: any) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({ [key]: value } as any);
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
        />
        <TextInput
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={this.onChange}
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

const mapStateToProps = ({ auth }: MainState) => {
  const { loggedIn } = auth;
  return { loggedIn };
};

const mapDispatchToProps = {
  loginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
