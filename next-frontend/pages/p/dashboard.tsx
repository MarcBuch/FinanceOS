import React from 'react';

// Componentes
import ProtectedWrapper from '../../components/auth/ProtectedWrapper';
import Sidebar from '../../components/navigation/Sidebar';

const Dashboard = (): JSX.Element => {
  return (
    <ProtectedWrapper>
      <div className="flex w-screen max-w-screen h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100">
          <main className="flex flex-col py-4 px-8">
            <div className="flex flex-row justify-end w-full">
              <select className="mx-2">
                <option value="january">Januray</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
              <select className="mx-2">
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>
            <div className="flex flex-row justify-center w-full">
              <div className="flex flex-col py-2 mx-12">
                <span className="text-3xl mb-1">1.800€</span>
                <span className="text-sm text-gray-600">Total Income</span>
              </div>
              <div className="flex flex-col py-2 mx-12">
                <span className="text-3xl mb-1">-800€</span>
                <span className="text-sm text-gray-600">Total Expenses</span>
              </div>
              <div className="flex flex-col py-2 mx-12">
                <span className="text-3xl text-positive mb-1">1.000€</span>
                <span className="text-sm text-gray-600">Net Income</span>
              </div>
              <div className="flex flex-col py-2 mx-12">
                <span className="text-3xl text-positive mb-1">80%</span>
                <span className="text-sm text-gray-600">Savings Ratio</span>
              </div>
            </div>
            <span className="divider my-8 mx-32 bg-gray-200" />
            <div className="flex flex-row justify-center w-full">
              <p className="text-gray-500">Coming Soon</p>
            </div>
          </main>
        </div>
      </div>
    </ProtectedWrapper>
  );
};

export default Dashboard;
