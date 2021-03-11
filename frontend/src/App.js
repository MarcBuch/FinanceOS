import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Context
import { GlobalContext } from "./publicComponents/contextStore/contextStore";

// Components
import SideBar from "./publicComponents/sidebar/SideBar";
import ErrorBoundary from "./views/ErrorBoundary";
import ProtectedRoute from "./views/ProtectedRoute";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import About from "./views/about/About";
import Demo from "./views/demo/Demo";
import GDPR from "./views/gdpr/GDPR";
import Imprint from "./views/gdpr/Imprint";
import DashboardFeature from "./views/dashboard/DashboardFeature";
import DataFeature from "./views/data/DataFeature";

import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    const language = navigator.language;

    // Functions for globalState
    this.toggleSidebar = () => {
      this.setState((state) => ({
        sideBarState: !state.sideBarState,
      }));
    };

    this.setToken = (token) => {
      this.setState({
        token: token,
      });
    };

    this.setUserID = (id) => {
      this.setState({ userID: id });
    };

    this.state = {
      sideBarState: false,
      toggleSidebar: this.toggleSidebar,
      userID: null,
      setUserID: this.setUserID,
      token: null,
      setToken: this.setToken,
      language: language,
    };
  }

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        <Router>
          <div className="wrapper flex">
            <SideBar sideBarState={this.state.sideBarState} />
            <div className="grid page">
              <ErrorBoundary>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/demo">
                  <Demo />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/imprint">
                  <Imprint />
                </Route>
                <Route exact path="/gdpr">
                  <GDPR />
                </Route>
                <Route exact path="/dashboard">
                  <ProtectedRoute>
                    <DashboardFeature />
                  </ProtectedRoute>
                </Route>
                <Route exact path="/data">
                  <ProtectedRoute>
                    <DataFeature />
                  </ProtectedRoute>
                </Route>
              </ErrorBoundary>
            </div>
          </div>
        </Router>
      </GlobalContext.Provider>
    );
  }
}
