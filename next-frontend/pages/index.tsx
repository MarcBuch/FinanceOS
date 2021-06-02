import React, { useEffect } from 'react';
import ReactLoading from 'react-loading';

// Redux
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import fetchUserToken from '../redux/actions/userActions';
import { selectUserState } from '../redux/slices/userSlice';

// Components
import User from '../components/User';

const IndexPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);

  useEffect(() => {
    dispatch(fetchUserToken({ username: 'marc', password: '12345' }));
  }, [dispatch]);

  return (
    <div>
      {userState.loading ? (
        <ReactLoading type="bars" color="white" />
      ) : (
        <User userId={userState.userId} />
      )}
    </div>
  );
};

export default IndexPage;
