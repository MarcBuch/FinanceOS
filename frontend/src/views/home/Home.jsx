import React, { useContext, useEffect } from "react";

// Context
import { GlobalContext } from "../../publicComponents/contextStore/contextStore";

// Assets
import "./home.css";

// Components
import Navbar from "../../publicComponents/navbar/Navbar";
import Footer from "../../publicComponents/footer/Footer";

const Home = () => {
  const globalState = useContext(GlobalContext);

  useEffect(() => {
    if (globalState.sideBarState === true) {
      globalState.toggleSidebar();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid content home">
        <div className="main-content">
          <h1>
            One Finance Tool
            <br /> to Rule Them All
          </h1>
          <p>
            Track your income/expenses <strong>AND</strong> your investments{" "}
          </p>
        </div>
        <div className="lower-content grid">
          <div className="card flex card1">
            <i className="far fa-money-bill-alt"></i>
            <p>Track your expenses</p>
          </div>
          <div className="card flex card2">
            <i className="fas fa-piggy-bank"></i>
            <p>Get insights into your spending habits</p>
          </div>
          <div className="card flex card3">
            <i className="fas fa-chart-line"></i>
            <p>Watch your favorite investments grow</p>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
