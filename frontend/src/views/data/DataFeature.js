import React, { useContext } from "react";

// Context
import { GlobalContext } from "../../publicComponents/contextStore/contextStore";

// Actions
import StatisticWorker from "../../actions/StatisticWorker";
import TransactionWorker from "../../actions/TransactionWorker";

// Components
import Header from "../../publicComponents/sidebar/Header";
import ErrorBoundary from "../ErrorBoundary";
import DataContainer from "./DataContainer";

const DataFeature = (props) => {
  const globalState = useContext(GlobalContext);
  const statisticWorker = new StatisticWorker(globalState.token);
  const transactionWorker = new TransactionWorker(globalState.token);

  return (
    <>
      <Header headline="Data" toggleSidebar={globalState.toggleSidebar} />
      <div className="grid content">
        <ErrorBoundary>
          <DataContainer
            statisticWorker={statisticWorker}
            transactionWorker={transactionWorker}
          />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default DataFeature;
