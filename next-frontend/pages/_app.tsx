import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';

// Styling
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
