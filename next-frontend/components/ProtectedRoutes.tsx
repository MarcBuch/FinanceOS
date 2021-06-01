import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import statisticActions from '../redux/actions/statisticActions';
import { IAction, IStatistic } from '../redux/types';

interface IProps {
  getStatistic: (token, year, month) => IAction;
  statistic: IStatistic;
  token: string;
}

const ProtectedRoutes = ({
  getStatistic,
  statistic,
  token,
}: IProps): JSX.Element => {
  useEffect(() => {
    getStatistic(token, 2021, 'january');
  }, []);

  return <h2>Month: {statistic.month}</h2>;
};

const mapStateToProps = (store: RootState) => {
  return {
    statistic: store.statistic,
    token: store.user.token,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getStatistic: (token, year, month) =>
      dispatch(statisticActions.getStatistic(token, year, month)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);
