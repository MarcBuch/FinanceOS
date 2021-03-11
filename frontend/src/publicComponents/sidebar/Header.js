import React from "react";
import "./Header.css";

const Header = ({ toggleSidebar, headline, children }) => {
  return (
    <div className="grid head">
      <span id="sideBarCollapseBtn">
        <i className="fas fa-align-left" onClick={toggleSidebar}></i>
      </span>
      <h1 className="capitalize">{headline}</h1>
      {children}
    </div>
  );
};

export default Header;
