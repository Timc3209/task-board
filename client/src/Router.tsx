import React from "react";
import { HashRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Boards from "./scenes/Boards";
import TaskBoard from "./scenes/TaskBoard";
import Login from "./scenes/Login";
import LoginRoute from "./components/LoginRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppState } from "./redux/reducers";

interface Props {
  loggedIn: boolean;
}

class Router extends React.Component<Props> {
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
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ auth }: AppState) => {
  const { loggedIn } = auth;
  return { loggedIn };
};

export default connect(mapStateToProps, undefined)(Router);
