import React, { useState, useEffect, useContext } from "react";

// Context
import { DataContext } from "../../../../publicComponents/contextStore/contextStore";

export const AddForm = (props) => {
  const dataState = useContext(DataContext);

  const [year, setYear] = useState(0);
  const [month, setMonth] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setYear(props.year);
    setMonth(props.month);
    setType("expense");
  }, [props.year, props.month]);

  const handleYearChange = (e) => setYear(e.target.value);
  const handleMonthChange = (e) => setMonth(e.target.value.toLowerCase());
  const handleTypeChange = (e) => setType(e.target.value.toLowerCase());
  const handleCategoryChange = (e) => setCategory(e.target.value.toLowerCase());
  const handleSubcategoryChange = (e) =>
    setSubcategory(e.target.value.toLowerCase());
  const handleAmountChange = (e) => setAmount(e.target.value);

  const submit = () => {
    dataState.transactionWorker
      .addTransaction(year, month, type, category, subcategory, amount)
      .then((res) => {
        dataState.statisticWorker.checkStatistic(year, month);
      });

    if (dataState.selectedYear !== year) dataState.setYear(year);
    if (dataState.selectedMonth !== month) dataState.setMonth(month);
    if (dataState.category !== category) dataState.setCategory(category);
    if (dataState.subcategory !== subcategory)
      dataState.setSubcategory(subcategory);
    if (dataState.amount !== amount) dataState.setAmount(amount);

    props.closeAllForms();
  };

  return (
    <div className="data-input-container flex">
      <input
        type="text"
        className="data-form-control"
        value={year}
        onChange={handleYearChange}
      />
      <select
        className="data-form-control"
        value={month}
        onChange={handleMonthChange}
      >
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </select>
      <select
        className="data-form-control"
        value={type}
        onChange={handleTypeChange}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        className="data-form-control"
        placeholder="Enter a category"
        onChange={handleCategoryChange}
      ></input>
      <input
        type="text"
        className="data-form-control"
        placeholder="Enter a subcategory"
        onChange={handleSubcategoryChange}
      ></input>
      <input
        type="text"
        className="data-form-control"
        placeholder="Enter a amount"
        onChange={handleAmountChange}
      ></input>
      <button
        className="data-submit data-btn btn-primary btn-block capitalize"
        onClick={submit}
      >
        add
      </button>
    </div>
  );
};

export default AddForm;
