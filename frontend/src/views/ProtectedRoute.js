import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { GlobalContext } from "../publicComponents/contextStore/contextStore";

const ProtectedRoute = (props) => {
  const globalState = useContext(GlobalContext);

  if (globalState.token) {
    return props.children;
  }

  return <Redirect to="/login" />;
};

export default ProtectedRoute;
