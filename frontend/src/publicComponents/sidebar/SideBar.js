import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./sideBar.css";

import { GlobalContext } from "../../publicComponents/contextStore/contextStore";

import AuthenticatedSidebar from "./AuthenticatedSidebar";
import DefaultSidebar from "./DefaultSidebar";

const Sidebar = ({ sideBarState }) => {
  const globalState = useContext(GlobalContext);

  return (
    <nav id="sidebar" className={sideBarState ? "active" : ""}>
      <div className="sidebar-header">
        <h2>
          <NavLink exact to="/">
            FinanceOS
          </NavLink>
        </h2>
      </div>
      {globalState.token !== null ? (
        <AuthenticatedSidebar />
      ) : (
        <DefaultSidebar />
      )}
      <div className="footer">
        <p>© 2020 Marc Buchardt</p>
      </div>
    </nav>
  );
};

export default Sidebar;
