import React from "react";
import AuthService from "../services/authService";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const user = AuthService.getCurrentUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};
