import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/* Previous Version 
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

  */

/* *************** New Version ************** */
const ProtectedRoute = ({ children, admin, staff, member }) => {
  const { isUserLogin, user } = useSelector((state) => state.auth);

  if (!isUserLogin) return <Navigate to="/auth" />;

  if (admin && user.roles.includes("Administrator")) {
    return children;
  } else if (staff && user.roles.includes("Staff")) {
    return children;
  } else if (member && user.roles.includes("Member")) {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};
export default ProtectedRoute;
