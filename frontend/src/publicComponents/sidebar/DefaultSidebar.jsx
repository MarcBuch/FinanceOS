import React from "react";
import { NavLink } from "react-router-dom";

const DefaultSidebar = () => {
  return (
    <ul className="list-unstyled components">
      <li>
        <NavLink className="capitalize" exact to="/login">
          login
        </NavLink>
      </li>
    </ul>
  );
};

export default DefaultSidebar;
