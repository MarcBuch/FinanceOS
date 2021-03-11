import React, { useContext, useEffect } from "react";

// Context
import { GlobalContext } from "../../publicComponents/contextStore/contextStore";

// Assets
import "./demo.css";

// Components
import Navbar from "../../publicComponents/navbar/Navbar";
import Footer from "../../publicComponents/footer/Footer";

const Demo = () => {
  const globalState = useContext(GlobalContext);

  useEffect(() => {
    if (globalState.sideBarState === true) {
      globalState.toggleSidebar();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid content about">
        <div className="main-content grid">
          <div id="app-description">
            <h1>This is a demo website!</h1>
            <p className="description">
              This website is created to display React and web development
              techniques and does not include a public SaaS application.
            </p>
            <p>If you have any questions, please contact me!</p>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Demo;
