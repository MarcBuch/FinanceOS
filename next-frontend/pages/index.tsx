import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import userActions from '../redux/actions/userActions';
import statisticActions from '../redux/actions/statisticActions';
import { IAction, IUser } from '../redux/types';

import User from '../components/User';
import ProtectedRoutes from '../components/ProtectedRoutes';

interface IProps {
  loginUser: (username, password) => IAction;
  user: IUser;
}

export const IndexPage = ({ loginUser, user }: IProps): JSX.Element => {
  useEffect(() => {
    loginUser('marc', '12345');
  }, []);

  return (
    <>
      <User user={user} />
      {user.token ? <ProtectedRoutes /> : ''}
    </>
  );
};

const mapStateToProps = (store: RootState) => {
  return {
    user: store.user,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    loginUser: (username, password) =>
      dispatch(userActions.loginUser(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
