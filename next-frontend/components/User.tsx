import React from 'react';

interface IProps {
  userId: string;
}

const User = ({ userId }: IProps): JSX.Element => <h1>Hello, {userId}</h1>;

export default User;
