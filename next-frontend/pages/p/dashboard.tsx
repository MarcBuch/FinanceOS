import React from 'react';

// Componentes
import ProtectedWrapper from '../../components/auth/ProtectedWrapper';
import Sidebar from '../../components/Sidebar';

const Dashboard = (): JSX.Element => {
  return (
    <ProtectedWrapper>
      <Sidebar />
    </ProtectedWrapper>
  );
};

export default Dashboard;
