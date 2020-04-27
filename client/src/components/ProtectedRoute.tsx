import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, ...props }: any) =>
  loggedIn ? <Route {...props} /> : <Redirect to="/" />;

export default ProtectedRoute;
