import React from "react";
import { NavLink } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <div className="grid head">
      <NavLink id="headline" exact to="/">
        <h2>
          Finance<strong className="highlighted">OS</strong>
        </h2>
      </NavLink>
      <div className="flex links">
        <NavLink exact to="/about">
          About
        </NavLink>
        <NavLink exact to="/demo">
          Pricing
        </NavLink>
        <a href="mailto:marc@buchardtprivat.de">Contact</a>
        <NavLink id="login" exact to="/login">
          <button>Get started</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
