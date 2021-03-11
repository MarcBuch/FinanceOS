import React, { Component } from "react";
import { months } from "../../utils/months";

// Context
import { DataContext } from "../../publicComponents/contextStore/contextStore";

// Components
import DataView from "./DataView";

export default class DataContainer extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    const currentYear = currentDate.getYear() + 1900;
    const currentMonth = months[currentDate.getMonth()].toLowerCase();

    this.setYear = (year) => this.setState({ selectedYear: year });
    this.setMonth = (month) => this.setState({ selectedMonth: month });
    this.setType = (type) => this.setState({ type: type });
    this.setCategory = (category) => this.setState({ category: category });
    this.setSubcategory = (subcategory) =>
      this.setState({ subcategory: subcategory });
    this.setAmount = (amount) => this.setState({ amount: amount });
    this.setLoading = (loading) => this.setState({ loading: loading });
    this.setError = (error) => this.setState({ error: error });

    this.state = {
      transactionWorker: this.props.transactionWorker,
      statisticWorker: this.props.statisticWorker,
      selectedYear: currentYear,
      selectedMonth: currentMonth,
      type: "all",
      category: null,
      subcategory: null,
      amount: null,
      transactions: null,
      loading: "...loading",
      error: null,
      setYear: this.setYear,
      setMonth: this.setMonth,
      setType: this.setType,
      setCategory: this.setCategory,
      setSubcategory: this.setSubcategory,
      setAmount: this.setAmount,
      setLoading: this.setLoading,
      setError: this.setError,
    };

    // Bind custom functions to class component
    this.updateTable = this.updateTable.bind(this);
  }

  // Initial rendering
  componentDidMount() {
    // Fetch Data
    this.props.transactionWorker
      .getTransaction("", this.state.selectedYear, this.state.selectedMonth)
      .then(
        (res) => {
          this.setState({ error: null, loading: null, transactions: res });
        },
        (error) => {
          this.setState({
            loading: null,
            transactions: null,
            error: error.message,
          });
        }
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedYear !== this.state.selectedYear ||
      prevState.selectedMonth !== this.state.selectedMonth ||
      prevState.category !== this.state.category ||
      prevState.subcategory !== this.state.subcategory ||
      prevState.amount !== this.state.amount
    ) {
      this.props.transactionWorker
        .getTransaction("", this.state.selectedYear, this.state.selectedMonth)
        .then(
          (res) => {
            this.setState({ error: null, loading: null, transactions: res });
          },
          (error) => {
            this.setState({
              loading: null,
              transactions: null,
              error: error.message,
            });
          }
        );
    }
  }

  updateTable(transactions) {
    /**
     * @desc Updates the transaction state.
     * @param {array} transactions - Takes an array of transaction objects and sets them as the new transaction state.
     */

    // If there isn't an error, close all forms
    if (this.state.error === null) {
      this.setState({ transactions: transactions });
      this.props.setDisplayAddForm(false);
      this.props.setDisplaySearchForm(false);
      this.props.setDisplayEditForm(false);
    }
  }

  render() {
    if (this.state.loading !== null) {
      return (
        <div className="card" id="data-card">
          <h2>{this.state.loading}</h2>
        </div>
      );
    }

    return (
      <DataContext.Provider value={this.state}>
        <DataView />
      </DataContext.Provider>
    );
  }
}
