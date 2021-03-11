import dataAPI from "../utils/api";
import { months } from "../utils/months";

export default class TransactionWorker {
  constructor(token) {
    this.token = token;
    this.header = { headers: { Authorization: this.token } };
  }

  async getTransaction(id, year, month, type, category, subcategory, amount) {
    /**
     * @desc 	Gets all transactions matching the input
     * @param 	{string} 	id
     * @param 	{number} 	year
     * @param 	{string} 	month
     * @param 	{string} 	type
     * @param 	{string} 	category
     * @param 	{string} 	subcategory
     * @param 	{number} 	amount
     * @return 	{object}	{year: 2020, month: "january", type: "expense"}
     */

    let queryString = "";

    if (id && id.length > 2) queryString += `id=${id}&`;
    if (year) queryString += `year=${year}&`;
    if (month) queryString += `month=${month}&`;
    if (type) queryString += `type=${type}&`;
    if (category) queryString += `category=${category}&`;
    if (subcategory) queryString += `subcategory=${subcategory}&`;
    if (amount) queryString += `amount=${amount}&`;

    try {
      const response = await dataAPI.get(
        `http://financeos:30001/api/transactions?${queryString}`,
        this.header
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      if (err.isAxiosError === true) {
        if (err.response.status === 404 || err.response.status === 400) {
          throw new Error(err.response.data.errors[0].msg);
        }
        throw new Error("GET /api/transactions failed");
      }
    }
  }

  async getAllTransactionsForYear(year) {
    /**
     * @desc 	Gets all transactions for a specified year.
     * @param 	{number} 	year
     * @return 	{object}	[{transaction}, {transaction}]
     */

    try {
      const response = await dataAPI.get(
        `http://financeos:30001/api/transactions?year=${year}`,
        this.header
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      if (err.isAxiosError === true) {
        if (err.response.status === 404) {
          throw new Error(err.response.data.errors[0].msg);
        }
        throw new Error("GET /api/transactions failed");
      }
    }
  }

  async getExpensesSortedByMonthAndCategory(year) {
    /**
     * @desc 	Gets all expenses for every month in a given year and sorts them by month and category.
     * @param 	{number} 	year
     * @return 	{object}	{january: { living: 250, entertainment: 100}, february: { living: 250, entertainment: 50}}
     */

    const expensesSorted = await this.getTransaction(
      "",
      year,
      "",
      "expense"
    ).then((res) => {
      if (!res.error) {
        const transactions = res;
        const categories = [];
        const ordered = [];

        transactions.forEach((transaction) => {
          if (transaction.category !== "investment") {
            // If the current categorie isnt saved, save it.
            if (!categories.includes(transaction.category)) {
              categories.push(transaction.category);
            }
          }
        });

        months.forEach((month) => {
          let obj = {
            name: month,
          };

          categories.forEach((category) => {
            obj[category] = 0.0;
          });

          transactions.forEach((transaction) => {
            month = month.toLowerCase();
            if (transaction.month === month) {
              const amount = obj[transaction.category] + transaction.amount;

              obj[transaction.category] =
                Math.round((amount + Number.EPSILON) * 100) / 100;
            }
          });
          ordered.push(obj);
        });
        return ordered;
      }
      return res;
    });
    return expensesSorted;
  }

  async getAllCategories(year) {
    /**
     * @desc 	Gets all categories.
     * @param 	{number} 	year
     * @return 	{array}		['living', 'entertainment', 'education']
     */

    const expensesSorted = await this.getTransaction(
      "",
      year,
      "",
      "expense"
    ).then((res) => {
      const transactions = res;
      const categories = [];

      try {
        transactions.forEach((transaction) => {
          if (transaction.category !== "investment") {
            if (!categories.includes(transaction.category)) {
              categories.push(transaction.category);
            }
          }
        });

        return categories;
      } catch (e) {
        console.error(e);
      }
    });
    return expensesSorted;
  }

  async addTransaction(year, month, type, category, subcategory = "", amount) {
    /**
     * @desc POSTs a transaction
     * @param {number}	year
     * @param	{string}	month
     * @param	{string}	type
     * @param	{string}	category
     * @param	{string}	subcategory
     * @param	{string}	amount
     * @return 	{object}	Returns the object added.
     */

    const requestObject = {
      year,
      month,
      type,
      category,
      subcategory,
      amount,
    };

    try {
      const response = await dataAPI.post(
        `http://financeos:30001/api/transactions`,
        requestObject,
        this.header
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err.response);
      console.log(err.response.data.errors[0].msg);
      return { error: err.response.data.errors[0].msg };
    }
  }

  async updateTransaction(
    id,
    year,
    month,
    type,
    category,
    subcategory = "",
    amount
  ) {
    if (!id || !year || !month || !type || !category || !amount) {
      return { msg: "Error: Please provide a valid object" };
    }

    const requestObject = {
      id,
      year,
      month,
      type,
      category,
      subcategory,
      amount,
    };

    try {
      const res = await dataAPI.put(
        `http://financeos:30001/api/transactions`,
        requestObject,
        this.header
      );

      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      if (err.isAxiosError === true) {
        if (err.response.status === 404) {
          throw new Error(err.response.data.errors[0].msg);
        }
        throw new Error("PUT /api/transaction failed");
      }
    }
  }

  async deleteTransaction(id) {
    if (!id) {
      return { msg: "Error: Please provide an id" };
    }

    try {
      const res = await dataAPI.delete(
        `http://financeos:30001/api/transactions?id=${id}`,
        this.header
      );

      if (res.status === 200) {
        return res.data;
      }
    } catch (err) {
      if (err.isAxiosError === true) {
        if (err.response.status === 404) {
          throw new Error(err.response.data.errors[0].msg);
        }
        throw new Error("DELETE /api/transaction failed");
      }
    }
  }
}
