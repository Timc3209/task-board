import React from "react";
import { Route, Redirect } from "react-router-dom";

const LoginRoute = ({ loggedIn, ...props }: any) =>
  loggedIn ? <Redirect to="/taskBoard" /> : <Route {...props} />;

export default LoginRoute;
