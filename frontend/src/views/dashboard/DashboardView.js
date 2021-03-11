import React, { Fragment, useContext } from "react";
import { months } from "../../utils/months";

import "./dashboard.css";

// Components
import { GlobalContext } from "../../publicComponents/contextStore/contextStore";
import BarChart from "./components/charts/BarChart";
import ExpensesByCategoryChart from "./components/charts/ExpensesByCategoryChart";
import SavingsRatioChart from "./components/charts/SavingsRatioChart";
import InfoCard from "./components/cards/InfoCard";
import RatioInfoCard from "./components/cards/RatioInfoCard";

const DashboardView = ({ statistic, netIncomeArray, cummulativeIncome }) => {
  /**
   * @desc  Returns the dashboard page.
   */
  const globalState = useContext(GlobalContext);

  return (
    <>
      <section className="grid" id="dashboard-infoCards">
        <Fragment>
          <InfoCard
            tag="TotalIncome"
            description="Total Income"
            value={statistic.totalIncome}
          />
          <InfoCard
            tag="TotalExpenses"
            description="Total Expenses"
            value={statistic.totalExpenses * -1}
          />
          <InfoCard
            tag="NetIncome"
            description="Net Income"
            value={statistic.netIncome}
          />
          <RatioInfoCard
            tag="SavingsRatio"
            description="Savings Ratio"
            value={statistic.savingsRatio}
            threshold={80}
          />
        </Fragment>
      </section>
      <section className="grid mt-5" id="dashboard-charts">
        <div className="card" id="dashboard-IncomePerMonth">
          <h2 className="capitalize mt-3">net income per month</h2>
          <div
            className="dashboard-charts"
            style={globalState.sideBarState ? { width: "30vw" } : {}}
          >
            <BarChart
              labels={months}
              data={netIncomeArray}
              valueName={"Net Income"}
            />
          </div>
        </div>
        <div className="card" id="dashboard-CummulativeIncome">
          <h2 className="capitalize mt-3">cummulative net income</h2>
          <div
            className="dashboard-charts"
            style={globalState.sideBarState ? { width: "30vw" } : {}}
          >
            <BarChart
              labels={months}
              data={cummulativeIncome}
              valueName={"Net Income"}
            />
          </div>
        </div>
        <div className="card mt-5" id="dashboard-ExpensesByCategory">
          <h2 className="capitalize mt-3">expenses by category</h2>
          <div
            className="dashboard-charts"
            style={globalState.sideBarState ? { width: "30vw" } : {}}
          >
            <ExpensesByCategoryChart />
          </div>
        </div>
        <div className="card mt-5" id="dashboard-SavingsRatioDoughnut">
          <h2 className="capitalize mt-3">savings ratio</h2>
          <div
            className="dashboard-charts dashboard-doughnut"
            style={globalState.sideBarState ? { width: "30vw" } : {}}
          >
            <SavingsRatioChart
              labels={["Total Income", "Total Expenses"]}
              totalIncome={statistic.totalIncome}
              totalExpenses={statistic.totalExpenses}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardView;
