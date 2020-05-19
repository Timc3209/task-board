import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  loggedIn: boolean;
}

const ProtectedRoute = ({ loggedIn, ...props }: Props) =>
  loggedIn ? <Route {...props} /> : <Redirect to="/" />;

export default ProtectedRoute;
