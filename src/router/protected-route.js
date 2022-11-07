import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin }) => {
  const { isUserLogin, user } = useSelector((state) => state.auth);

  if (!isUserLogin) return <Navigate to="/auth" />;

  const management = ["Administrator", "Staff"];

  const multipleExist = async () =>
    management.every((value) => {
      return multipleExist.includes(value);
    });

  if (!multipleExist) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
