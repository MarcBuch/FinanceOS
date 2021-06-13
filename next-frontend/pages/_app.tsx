import React from 'react';
import type { AppProps } from 'next/app';

// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';

// Auth0
import AuthProvider from '../components/auth/AuthProvider';

// Styling
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Provider store={store}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </Provider>
);

export default MyApp;
