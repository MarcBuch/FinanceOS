import { ActionCreator, AnyAction } from 'redux';
import { Constants } from '../types';

interface IUserLogin {
  success: boolean;
  token: {
    token: string;
    expires: string;
  };
  expiresIn: string;
  userID: string;
}

const dispatchLogin = (user: IUserLogin) => ({
  type: Constants.LOGIN_USER,
  payload: {
    id: user.userID,
    token: user.token.token,
    expiresIn: user.expiresIn,
  },
});

const loginUser = (username: string, password: string) => (
  dispatch,
  getState,
  axios
) => {
  axios
    .post('http://localhost:30002/api/auth/login', { username, password })
    .then((res) => res.data)
    .then((user: IUserLogin) => {
      dispatch(dispatchLogin(user));
    });
};

const userActions = {
  loginUser,
};

export default userActions;
