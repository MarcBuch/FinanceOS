import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import { GlobalContext } from "../../../../publicComponents/contextStore/contextStore";

import { login } from "../../../../actions/Authorization";

const LoginForm = (props) => {
  const globalState = useContext(GlobalContext);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginBtnClick = (e) => {
    if (error) {
      setError(null);
    }

    login(username, password)
      .then((res) => {
        globalState.setUserID(res.userID);
        globalState.setToken(res.token.token);
        setRedirect(true);
      })
      .catch((err) => {
        console.log({ err });
        setError(err.message);
      });
  };

  if (redirect === true) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="input-container flex">
      <h2 className="header">FinanceOS</h2>
      <p className="form-control-header capitalize">username</p>
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        onChange={handleUsernameChange}
      />
      <p className="form-control-header capitalize">password</p>
      <input
        type="password"
        className="form-control"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      {error ? <p className="error">{error}</p> : <> </>}
      <button
        className="submit btn btn-primary btn-block"
        onClick={loginBtnClick}
      >
        LOG IN
      </button>
    </div>
  );
};

export default LoginForm;
