class Statistic {
  /**
   * @param {array} transactions Takes an array of transaction objects and constructs a statistic object for the current month.
   */
  constructor(transactions) {
    this.transactions = transactions;
    this.totalIncome = 0;
    this.totalExpenses = 0;
    this.totalExpensesWithSavings = 0;
    this.netIncome = 0;
    this.spendPerTransaction = 0;
    this.savingsRatio = 0;

    this.setTotalIncomeTotalExpenses();
    this.setNetIncome();
    this.setSpendPerTransaction();
    this.setSavingsRatio();
  }

  setTotalIncomeTotalExpenses() {
    this.transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        this.totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        this.totalExpensesWithSavings += transaction.amount;

        if (transaction.category !== 'investment') {
          this.totalExpenses += transaction.amount;
        }
      }
    });
    this.totalIncome = parseFloat(this.totalIncome.toFixed(2));
    this.totalExpenses = parseFloat(this.totalExpenses.toFixed(2));
    this.totalExpensesWithSavings = parseFloat(this.totalExpensesWithSavings.toFixed(2));
  }

  setNetIncome() {
    this.netIncome = this.totalIncome + this.totalExpenses * -1;
    this.netIncome = parseFloat(this.netIncome.toFixed(2));
  }

  setSpendPerTransaction() {
    let sumOfExpenses = 0;
    let sumOfTransactions = 0;

    this.transactions.forEach((transaction) => {
      if (
        transaction.type === 'expense' &&
        (transaction.category !== 'investment' || transaction.category !== 'savings')
      ) {
        sumOfExpenses += transaction.amount;
        sumOfTransactions += 1;
      }
    });
    if (sumOfExpenses !== 0) {
      this.spendPerTransaction = parseFloat(((sumOfExpenses / sumOfTransactions) * -1).toFixed(2));
    }
  }

  setSavingsRatio() {
    if (this.totalIncome === 0) {
      // Can't devide a negative number by 0, e.g. 0 - 50 = -50 / 0 = ?
      this.savingsRatio = 0;
    } else {
      this.savingsRatio = parseInt(
        ((this.totalIncome - this.totalExpenses) / this.totalIncome) * 100,
        10
      );
    }
  }
}

module.exports = Statistic;
