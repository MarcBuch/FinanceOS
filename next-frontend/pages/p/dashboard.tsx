import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = (): JSX.Element => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <h1>Not authenticated</h1>;
  }

  return isAuthenticated && <h1>Hello {user.name}</h1>;
};

export default Dashboard;
