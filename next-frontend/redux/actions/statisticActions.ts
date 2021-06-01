import { Constants, IStatistic } from '../types';

const dispatchGetStatistic = (statistic: IStatistic) => ({
  type: Constants.GET_STATISTIC,
  payload: statistic,
});

const getStatistic = (token: string, year: number, month: string) => (
  dispatch,
  getState,
  axios
) => {
  if (token.length !== 0) {
    const header = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(
        `http://financeos:30001/api/statistics?year=${year}&month=${month}`,
        header
      )
      .then((res) => res.data)
      .then((statistic) => {
        dispatch(dispatchGetStatistic(statistic[0]));
      });
  }
};

const StatisticActions = {
  getStatistic,
};

export default StatisticActions;
