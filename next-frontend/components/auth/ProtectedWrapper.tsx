import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

interface IProps {
  children: React.ReactNode;
}

const ProtectedWrapper = ({ children }: IProps): JSX.Element => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Oops... {error.message}</h1>;
  }

  return <>{children}</>;
};

export default withAuthenticationRequired(ProtectedWrapper, {
  onRedirecting: () => <h1>Youre not logged in</h1>,
});
