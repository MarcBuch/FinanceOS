import React, { useContext, useEffect } from "react";

// Context
import { GlobalContext } from "../../publicComponents/contextStore/contextStore";

// Assets
import "./about.css";
import Marc from "./memoji.png";

// Components
import Navbar from "../../publicComponents/navbar/Navbar";
import Footer from "../../publicComponents/footer/Footer";

const About = () => {
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
            <h1>Designed to guide you to financial freedom</h1>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
              quos expedita iusto id neque excepturi quae vel dicta eius, fugiat
              commodi architecto adipisci eaque quo odit. Ad tenetur
              consequuntur itaque. Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Ipsum iure consectetur, velit perferendis
              cupiditate ratione quisquam nesciunt! Quas animi voluptatibus
              exercitationem. Ipsam atque fugit ea sunt sit hic maxime illum?
            </p>
          </div>
          <div className="grid" id="team">
            <img src={Marc} alt="Founder" />
            <div className="item-description">
              <h2>Marc Buchardt</h2>
              <div className="description">
                <p>Founder</p>
                <p>
                  "I created FinanceOS to keep track of my personal financials
                  and to abandon my excel sheet."
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
