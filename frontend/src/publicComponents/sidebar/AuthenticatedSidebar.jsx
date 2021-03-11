import React from "react";
import { NavLink } from "react-router-dom";

const AuthenticatedSidebar = () => {
  return (
    <ul className="list-unstyled components">
      <li>
        <NavLink className="capitalize" exact to="/dashboard">
          dashboard
        </NavLink>
      </li>
      <li>
        <NavLink className="capitalize" exact to="/data">
          data
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthenticatedSidebar;
