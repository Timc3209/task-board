import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  loggedIn: boolean;
}

const LoginRoute = ({ loggedIn, ...props }: Props) =>
  loggedIn ? <Redirect to="/taskBoard" /> : <Route {...props} />;

export default LoginRoute;
