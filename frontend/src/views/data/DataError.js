import React, { Fragment, useContext } from "react";

// Context
import { DataContext } from "../../publicComponents/contextStore/contextStore";

// Components
import SearchForm from "./components/forms/SearchForm";
import AddForm from "./components/forms/AddForm";

const DataError = ({ error }) => {
  const dataState = useContext(DataContext);

  return (
    <>
      <div className="card" id="data-card">
        <div id="data-actions">
          <div className="flex">
            <button
              className="data-btn"
              id="data-searchBtn"
              onClick={dataState.searchBtnClick}
            >
              {dataState.displaySearchForm ? (
                <span>close</span>
              ) : (
                <Fragment>
                  <i className="fas fa-search mr-025"></i>
                  <span>search</span>
                </Fragment>
              )}
            </button>
            <button
              className="data-btn"
              id="data-addBtn"
              onClick={dataState.addBtnClick}
            >
              {dataState.displayAddForm ? (
                <span>close</span>
              ) : (
                <Fragment>
                  <i className="fas fa-plus mr-025"></i>
                  <span>add</span>
                </Fragment>
              )}
            </button>
          </div>
          {dataState.displaySearchForm && (
            <SearchForm
              year={dataState.selectedYear}
              month={dataState.selectedMonth}
              updateTable={dataState.updateTable}
            />
          )}
          {dataState.displayAddForm && (
            <AddForm
              year={dataState.selectedYear}
              month={dataState.selectedMonth}
              updateTable={dataState.updateTable}
            />
          )}
        </div>
        <div className="data-output" id="error">
          <h2>{error.message}</h2>
        </div>
      </div>
    </>
  );
};

export default DataError;
