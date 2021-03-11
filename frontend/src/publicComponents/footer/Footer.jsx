import React from "react";

import { NavLink } from "react-router-dom";

import "./footer.css";

const Footer = () => {
  return (
    <div className="bottom flex">
      <NavLink id="credit" exact to="/">
        © 2020 Marc Buchardt
      </NavLink>
      <NavLink id="imprint" exact to="/imprint">
        Imprint
      </NavLink>
      <NavLink id="gdpr" exact to="/gdpr">
        GDPR
      </NavLink>
    </div>
  );
};

export default Footer;
