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
  email: string;
  password: string;
}

class Login extends React.Component<Props, States> {
  readonly state: States = {
    email: "",
    password: "",
  };

  checkLogin = () => {
    const { email, password } = this.state;
    this.props.loginSuccess("aaa");
  };

  onChange = (event: any) => {
    const key = event.currentTarget.name;
    const value = event.currentTarget.value;
    this.setState({ [key]: value } as any);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-form">
        <h1>
          <span className="font-weight-bold">Task Board</span>
        </h1>
        <h2 className="text-center">Login</h2>
        <TextInput
          name="email"
          label="Email"
          type="email"
          value={email}
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
