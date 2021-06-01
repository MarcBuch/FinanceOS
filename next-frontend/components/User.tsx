import React from 'react';
import { IUser } from '../redux/types';

interface IProps {
  user: IUser;
}

const User = ({ user }: IProps): JSX.Element => <h1>Hello, {user.id}</h1>;

export default User;
