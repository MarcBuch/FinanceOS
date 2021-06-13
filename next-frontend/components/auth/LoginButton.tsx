import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {
  text?: string;
  className?: string;
}

const defaultProps: IProps = {
  text: 'Login',
  className: 'flex button-main align-center justify-center text-sm px-4 py-2',
};

const LoginButton = ({ text, className }: IProps): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      type="button"
      className={className}
      onClick={() => loginWithRedirect()}
    >
      {text}
    </button>
  );
};

LoginButton.defaultProps = defaultProps;

export default LoginButton;
