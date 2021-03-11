import React, { useContext } from "react";

import { GlobalContext } from "../../publicComponents/contextStore/contextStore";

// Components
import Header from "../../publicComponents/sidebar/Header";
import LoginForm from "./components/forms/LoginForm";

import "./login.css";

const Login = () => {
  const globalState = useContext(GlobalContext);

  return (
    <>
      <Header toggleSidebar={globalState.toggleSidebar} headline="Login" />
      <div className="grid content">
        <div className="card" id="login-card">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
