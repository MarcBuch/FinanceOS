import React from 'react';
import ReactLoading from 'react-loading';

import Sidebar from '../navigation/Sidebar';

const LoginLoading = (): JSX.Element => (
  <div className="flex w-screen max-w-screen h-screen">
    <Sidebar />
    <div className="flex-1 bg-gray-100">
      <main className="flex flex-col items-center align-center justify-center h-screen">
        <ReactLoading type="bars" color="#3d53af" height="80px" width="80px" />
        <p>Loading</p>
      </main>
    </div>
  </div>
);

export default LoginLoading;
