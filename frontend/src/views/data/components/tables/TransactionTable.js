import React, { useContext } from "react";

import { DataContext } from "../../../../publicComponents/contextStore/contextStore";

export const TransactionTable = ({ transactions, editBtnClick }) => {
  const dataState = useContext(DataContext);

  const deleteBtnClick = (e) => {
    /**
     * @desc Deletes a transaction based on its id.
     * @param {object} e - Event object to get the transaction id from.
     */

    const id = e.target.dataset.id;

    dataState.transactionWorker
      .getTransaction(e.target.dataset.id)
      .then((res) => {
        const transactionYear = res.year;
        const transactionMonth = res.month;

        dataState.transactionWorker.deleteTransaction(id).then((res) => {
          dataState.statisticWorker.checkStatistic(
            transactionYear,
            transactionMonth
          );

          dataState.transactionWorker
            .getTransaction("", transactionYear, transactionMonth)
            .then(
              (res) => {
                dataState.setTransactions(res);
              },
              (error) => {
                dataState.setError(error.message);
              }
            );
        });
      });
  };
  return (
    <table className="data-table mt-3">
      <thead className="data-thead-dark">
        <tr>
          <th className="data-tableHeader capitalize" scope="col">
            year
          </th>
          <th className="data-tableHeader capitalize" scope="col">
            month
          </th>
          <th className="data-tableHeader capitalize" scope="col">
            type
          </th>
          <th className="data-tableHeader capitalize" scope="col">
            category
          </th>
          <th className="data-tableHeader capitalize" scope="col">
            subcategory
          </th>
          <th className="data-tableHeader capitalize" scope="col">
            amount
          </th>
          <th className="data-tableHeader capitalize" scope="col">
            actions
          </th>
        </tr>
      </thead>
      <tbody className="data-tbody">
        {transactions.map((transaction) => (
          <tr key={transaction._id} data-id={transaction._id}>
            <th scope="row" className="year capitalize">
              {transaction.year}
            </th>
            <th scope="row" className="month capitalize">
              {transaction.month}
            </th>
            <td className="capitalize">{transaction.type}</td>
            <td className="capitalize">{transaction.category}</td>
            <td className="capitalize">{transaction.subcategory}</td>
            <td className="capitalize">{transaction.amount}€</td>
            <td className="capitalize">
              <i
                className="data-editIcon fas fa-edit"
                data-id={transaction._id}
                onClick={editBtnClick}
              />
              <i
                className="data-deleteIcon fas fa-trash"
                data-id={transaction._id}
                onClick={deleteBtnClick}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
