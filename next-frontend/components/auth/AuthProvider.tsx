import React from 'react';
import { withRouter } from 'next/router';
import { Auth0Provider } from '@auth0/auth0-react';

interface IProps {
  children: React.ReactNode;
  router: any;
}

const AuthProvider = ({ router, children }: IProps): JSX.Element => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const redirectUri = `http://localhost:3000${router.pathname}`;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      {children}
    </Auth0Provider>
  );
};

export default withRouter(AuthProvider);
