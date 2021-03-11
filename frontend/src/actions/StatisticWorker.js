import dataAPI from "../utils/api";

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export default class StatisticWorker {
  constructor(token) {
    this.token = token;
    this.header = { headers: { Authorization: this.token } };
  }

  async getStatistic(year, month) {
    /**
     * @desc Get a single statistic object for a certain month and year.
     * @param {number} year
     * @param {string} month
     * @return {object} {year: 2020, month: "january", totalIncome: 100}
     */

    try {
      const res = await dataAPI.get(
        `http://financeos:30001/api/statistics?year=${year}&month=${month}`,
        this.header
      );

      if (res.status === 200) {
        return res.data[0];
      }
    } catch (err) {
      if (err.isAxiosError === true) {
        if (err.response.status === 404) {
          throw new Error(err.response.data.errors[0].msg);
        }
        throw new Error("GET /api/statistic failed");
      }
    }
  }

  async getStatistics(year) {
    /**
     * @desc Gets all statistic objects for a certain year.
     * @param   {number} year
     * @return  {array}  [{statistic}, {statistic}]
     */

    try {
      const res = await dataAPI.get(
        `http://financeos:30001/api/statistics?year=${year}`,
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
        throw new Error("GET /api/statistic failed");
      }
    }
  }

  async getNetIncomeAsArray(year) {
    /**
     * @desc 	Gets all statistics of a year and puts the netIncome for each month into an array.
     * @param 	{number} year
     * @return 	{array}  [100, 10, 350]
     */

    const stats = await this.getStatistics(year).then((res) => {
      const netIncomeObj = {};

      months.forEach((month) => {
        netIncomeObj[month] = 0;
      });

      res.forEach((statistic) => {
        netIncomeObj[statistic.month] = statistic.netIncome;
      });

      const netIncomeArray = [];

      months.forEach((month) => {
        netIncomeArray.push(netIncomeObj[month]);
      });

      return netIncomeArray;
    });

    return stats;
  }

  getCummulativeIncome(netIncomeArray) {
    /**
     * @desc Takes an array of netIncome values and adds them up.
     * @param 	{array} 	netIncomeArray
     * @return 	{array}		[100, 110, 460]
     */

    var cummulativeNetIncome = [];
    if (netIncomeArray != null) {
      for (let index = 0; index < 12; index++) {
        // First month doesn't have a previous month
        if (index === 0) {
          cummulativeNetIncome.push(netIncomeArray[index]);
        } else {
          // If there is no income for this month, add the previous month
          if (!netIncomeArray[index]) {
            cummulativeNetIncome.push(cummulativeNetIncome[index - 1]);
          } else {
            var netIncomeFloat = parseFloat(netIncomeArray[index].toFixed(2));
            var cummulativeNetIncomeFloat = parseFloat(
              cummulativeNetIncome[index - 1].toFixed(2)
            );

            cummulativeNetIncome.push(
              parseFloat(
                (netIncomeFloat + cummulativeNetIncomeFloat).toFixed(2)
              )
            );
          }
        }
      }
    } else {
      console.error("Error: Cant getCummulativeIncome without netIncomeArray");
      return null;
    }
    return cummulativeNetIncome;
  }

  async checkStatistic(year, month) {
    /**
     * @desc 	Checks if a statistic exists, and refreshes it or creates a new statistic.
     * @param	{number}	year
     * @param	{string}	month
     */

    try {
      await this.getStatistic(year, month);

      this.refreshStatistic(year, month);
    } catch (err) {
      this.newStatistic(year, month);
    }
  }

  async newStatistic(year, month) {
    /**
     * @desc	Creates a new statistic.
     * @param	{number}	year
     * @param	{string}	month
     */

    try {
      await dataAPI.post(
        `http://financeos:30001/api/statistics?year=${year}&month=${month}`,
        null,
        this.header
      );
    } catch (err) {
      console.log({ err });
      if (err.isAxiosError === true) {
        if (err.response.status === 404) {
          throw new Error(err.response.data.errors[0].msg);
        }
        throw new Error("GET /api/statistic failed");
      }
    }
  }

  async refreshStatistic(year, month) {
    /**
     * @desc	Refreshes a statistic.
     * @param	{number}	year
     * @param	{string}	month
     */

    try {
      await dataAPI.put(
        `http://financeos:30001/api/statistics?year=${year}&month=${month}`,
        {},
        this.header
      );
    } catch (err) {
      if (err.isAxiosError === true) {
        if (err.response.status === 404) {
          throw new Error(err.response.data.errors[0].msg);
        }
        throw new Error("GET /api/statistic failed");
      }
    }
  }
}
