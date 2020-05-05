import React from "react";
import { HashRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Boards from "./scenes/Boards";
import Users from "./scenes/Users";
import TaskBoard from "./scenes/TaskBoard";
import Login from "./scenes/Login";
import LoginRoute from "./components/LoginRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { MainState } from "./redux/types";

interface Props {
  loggedIn: boolean;
}

interface States {}

class App extends React.Component<Props, States> {
  render() {
    return (
      <HashRouter>
        <Switch>
          <LoginRoute
            exact
            path="/"
            component={Login}
            loggedIn={this.props.loggedIn}
          />
          <ProtectedRoute
            path="/taskBoard"
            component={TaskBoard}
            loggedIn={this.props.loggedIn}
          />
          <ProtectedRoute
            path="/boards"
            component={Boards}
            loggedIn={this.props.loggedIn}
          />
          <ProtectedRoute
            path="/users"
            component={Users}
            loggedIn={this.props.loggedIn}
          />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ auth }: MainState) => {
  const { loggedIn } = auth;
  return { loggedIn };
};

const mapDispatchToProps = {
  undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
