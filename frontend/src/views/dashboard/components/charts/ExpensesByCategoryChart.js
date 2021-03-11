import React, { Fragment, useState, useEffect, useContext } from "react";
import MediaQuery from "react-responsive";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { DashboardContext } from "../../../../publicComponents/contextStore/contextStore";

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

export const ExpensesByCategoryChart = (props) => {
  const [expensesSorted, setExpensesSorted] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState({});

  const dashboardState = useContext(DashboardContext);

  useEffect(() => {
    let isMounted = true;

    dashboardState.TransactionWorker.getExpensesSortedByMonthAndCategory(
      dashboardState.selectedYear
    ).then((res) => {
      if (isMounted) {
        if (res.length > 1) {
          setExpensesSorted(res);
        }
      }
    });

    dashboardState.TransactionWorker.getAllCategories(
      dashboardState.selectedYear
    ).then((res) => {
      if (isMounted) {
        if (res.length > 0) {
          setCategories(res);
          let colorObj = {};

          res.forEach((category) => {
            colorObj[category] = `#${genRanHex(6)}`;
          });

          setColors(colorObj);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [dashboardState.TransactionWorker]);

  const euroFormatter = (value) => `${value}€`;

  if (expensesSorted.length > 1) {
    return (
      <Fragment>
        <MediaQuery maxDeviceWidth={768}>
          <BarChart
            width={300}
            height={300}
            data={expensesSorted}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              interval={1}
              angle={-20}
              dy={4}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickFormatter={euroFormatter}
              tick={{ fontSize: 10 }}
              dx={-2}
            />
            <Tooltip formatter={euroFormatter} />
            {categories.map((category) => (
              <Bar
                key={Math.random()}
                dataKey={category}
                stackId="a"
                fill={colors[category]}
              />
            ))}
          </BarChart>
        </MediaQuery>
        <MediaQuery minDeviceWidth={769}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={600}
              height={300}
              data={expensesSorted}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-20}
                dy={9}
                tick={{ fontSize: 12.5 }}
              />
              <YAxis
                tickFormatter={euroFormatter}
                tick={{ fontSize: 12.5 }}
                dx={-2}
              />
              <Tooltip formatter={euroFormatter} />
              {categories.map((category) => (
                <Bar
                  key={Math.random()}
                  dataKey={category}
                  stackId="a"
                  fill={colors[category]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </MediaQuery>
      </Fragment>
    );
  } else {
    return <Fragment></Fragment>;
  }
};
export default ExpensesByCategoryChart;
