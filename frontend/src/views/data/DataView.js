import React, { Fragment, useState, useContext } from "react";

// Context
import { DataContext } from "../../publicComponents/contextStore/contextStore";

// Components
import SearchForm from "./components/forms/SearchForm";
import AddForm from "./components/forms/AddForm";
import EditForm from "./components/forms/EditForm";
import TransactionTable from "./components/tables/TransactionTable";

import "./data.css";

const DataView = () => {
  const dataState = useContext(DataContext);

  const [displayAddForm, setDisplayAddForm] = useState(false);
  const [displaySearchForm, setDisplaySearchForm] = useState(false);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const searchBtnClick = () => {
    setDisplaySearchForm(!displaySearchForm);
    setDisplayAddForm(false);
    setDisplayEditForm(false);
  };

  const addBtnClick = () => {
    setDisplayAddForm(!displayAddForm);
    setDisplaySearchForm(false);
    setDisplayEditForm(false);
  };

  const editBtnClick = (e) => {
    setEditItem(e.target.dataset.id);
    setDisplayEditForm(!displayEditForm);
    setDisplaySearchForm(false);
    setDisplayAddForm(false);
  };

  const closeAllForms = () => {
    setDisplayEditForm(false);
    setDisplayAddForm(false);
    setDisplaySearchForm(false);
  };

  return (
    <div className="card" id="data-card">
      <div id="data-actions">
        <div className="flex">
          <button
            className="data-btn"
            id="data-searchBtn"
            onClick={searchBtnClick}
          >
            {displaySearchForm ? (
              <span>close</span>
            ) : (
              <Fragment>
                <i className="fas fa-search mr-025"></i>
                <span>search</span>
              </Fragment>
            )}
          </button>
          <button className="data-btn" id="data-addBtn" onClick={addBtnClick}>
            {displayAddForm ? (
              <span>close</span>
            ) : (
              <Fragment>
                <i className="fas fa-plus mr-025"></i>
                <span>add</span>
              </Fragment>
            )}
          </button>
        </div>
        {displaySearchForm && (
          <SearchForm
            year={dataState.selectedYear}
            month={dataState.selectedMonth}
            updateTable={dataState.updateTable}
            closeAllForms={closeAllForms}
          />
        )}
        {displayAddForm && (
          <AddForm
            year={dataState.selectedYear}
            month={dataState.selectedMonth}
            updateTable={dataState.updateTable}
            closeAllForms={closeAllForms}
          />
        )}
        {displayEditForm && (
          <EditForm
            editItem={editItem}
            updateTable={dataState.updateTable}
            closeAllForms={closeAllForms}
          />
        )}
      </div>
      <div className="data-output">
        {dataState.error ? (
          <h2>{dataState.error}</h2>
        ) : (
          <TransactionTable
            transactions={dataState.transactions}
            editBtnClick={editBtnClick}
          />
        )}
      </div>
    </div>
  );
};

export default DataView;
