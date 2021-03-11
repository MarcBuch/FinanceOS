import React, { useContext, useState } from "react";

// Context
import { GlobalContext } from "../../publicComponents/contextStore/contextStore";

// Actions
import StatisticWorker from "../../actions/StatisticWorker";
import TransactionWorker from "../../actions/TransactionWorker";

// Components
import DashboardContainer from "./DashboardContainer";
import ErrorBoundary from "../ErrorBoundary";

const DashboardFeature = () => {
  const globalState = useContext(GlobalContext);
  const statisticWorker = new StatisticWorker(globalState.token);
  const transactionWorker = new TransactionWorker(globalState.token);

  return (
    <ErrorBoundary>
      <DashboardContainer
        StatisticWorker={statisticWorker}
        TransactionWorker={transactionWorker}
        toggleSidebar={globalState.toggleSidebar}
      />
    </ErrorBoundary>
  );
};

export default DashboardFeature;
