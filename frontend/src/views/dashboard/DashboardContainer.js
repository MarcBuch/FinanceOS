import React, { Component } from "react";
import PropTypes from "prop-types";
import { months } from "../../utils/months";

// Context
import { DashboardContext } from "../../publicComponents/contextStore/contextStore";

// Components
import DashboardView from "./DashboardView";
import ErrorBoundary from "../ErrorBoundary";
import Header from "../../publicComponents/sidebar/Header";

export default class DashboardContainer extends Component {
  /**
   * @desc Class component for the dashboard view, which is responsible for data fetching.
   * @param {object}  StatisticWorker - Helper object for data fetching.
   * @param {object}  TransactionWorker - Helper object for data fetching.
   */

  constructor(props) {
    super(props);

    const currentDate = new Date();
    const currentYear = currentDate.getYear() + 1900;
    const currentMonth = months[currentDate.getMonth()].toLowerCase();

    this.state = {
      error: null,
      loading: "loading...",
      selectedYear: currentYear,
      selectedMonth: currentMonth,
      StatisticWorker: this.props.StatisticWorker,
      TransactionWorker: this.props.TransactionWorker,
      statistic: null,
      netIncomeArray: [],
      cummulativeIncome: [],
    };

    this.monthOnChange = this.monthOnChange.bind(this);
    this.yearOnChange = this.yearOnChange.bind(this);
  }

  // After initial rendering
  componentDidMount() {
    // Fetch data
    this.state.StatisticWorker.getStatistic(
      this.state.selectedYear,
      this.state.selectedMonth
    ).then(
      (res) => {
        this.setState({ loading: null, error: null, statistic: res });

        this.state.StatisticWorker.getNetIncomeAsArray(
          this.state.selectedYear
        ).then((res) => {
          const calculatedIncome = this.state.StatisticWorker.getCummulativeIncome(
            res
          );
          this.setState({
            netIncomeArray: res,
            cummulativeIncome: calculatedIncome,
          });
        });
      },
      (error) => {
        this.setState({ loading: null, statistic: null, error });
      }
    );
  }

  // On re-rendering
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedMonth !== this.state.selectedMonth ||
      prevState.selectedYear !== this.state.selectedYear
    ) {
      if (this.state.error !== null) {
        this.setState({ error: null });
      }

      this.setState({
        statistic: null,
        netIncomeArray: null,
        cummulativeIncome: null,
        loading: "loading...",
      });

      this.state.StatisticWorker.getStatistic(
        this.state.selectedYear,
        this.state.selectedMonth
      ).then(
        (res) => {
          this.setState({ error: null, statistic: res });

          this.state.StatisticWorker.getNetIncomeAsArray(
            this.state.selectedYear
          ).then((res) => {
            if (typeof res[0] === "number") {
              this.setState({ netIncomeArray: res });
              this.setState({
                cummulativeIncome: this.state.StatisticWorker.getCummulativeIncome(
                  res
                ),
                loading: null,
              });
            }
          });
        },
        (error) => {
          this.setState({
            error: error,
            loading: null,
            statistic: null,
            netIncomeArray: null,
            cummulativeIncome: null,
          });
        }
      );
    }
  }

  monthOnChange(e) {
    const month = e.target.value.toLowerCase();
    this.setState({ selectedMonth: month });
  }

  yearOnChange(e) {
    const year = e.target.value;
    this.setState({ selectedYear: year });
  }

  render() {
    if (this.state.loading !== null) {
      return <p>{this.state.loading}</p>;
    }

    return (
      <>
        <Header headline={"Dashboard"} toggleSidebar={this.props.toggleSidebar}>
          <select
            id="monthSelector"
            onChange={this.monthOnChange}
            value={this.state.selectedMonth}
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
            id="yearSelector"
            onChange={this.yearOnChange}
            value={this.state.selectedYear}
          >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </Header>
        <div className="grid content">
          {this.state.error !== null ? (
            <div id="error">
              <h2>{this.state.error.message}</h2>
            </div>
          ) : (
            <ErrorBoundary>
              <DashboardContext.Provider value={this.state}>
                <DashboardView
                  statistic={this.state.statistic}
                  netIncomeArray={this.state.netIncomeArray}
                  cummulativeIncome={this.state.cummulativeIncome}
                />
              </DashboardContext.Provider>
            </ErrorBoundary>
          )}
        </div>
      </>
    );
  }
}

// Property validation
DashboardContainer.propTypes = {
  StatisticWorker: PropTypes.object.isRequired,
  TransactionWorker: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
