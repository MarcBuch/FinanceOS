import React from 'react';

// Components
import ProtectedWrapper from '../../components/auth/ProtectedWrapper';
import Sidebar from '../../components/navigation/Sidebar';

const data = (): JSX.Element => (
  <ProtectedWrapper>
    <div className="flex w-screen max-w-screen h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100">
        <main className="flex flex-col py-4 px-8">
          <div className="flex flex-row justify-between w-full mt-6">
            <span className="text-xl font-semibold">Transactions</span>
            <div>
              <button
                type="button"
                className="border rounded-md border-main bg-main text-white text-sm px-2 py-1 mx-2"
              >
                New Transaction
              </button>
              <button
                type="button"
                className="border rounded-md border-gray-400 bg-gray-200 text-sm px-2 py-1 mx-2"
              >
                Import from File
              </button>
            </div>
          </div>
          <span className="divider my-8 mx-16 bg-gray-200" />
          <div className="flex flex-row justify-start w-full">
            <span className="text-md">Filter</span>
            <div className="border rounded-md border-gray-400 text-sm ml-4 mr-2">
              <select className="bg-gray-100">
                <option>All Years</option>
              </select>
            </div>
            <div className="border rounded-md border-gray-400 text-sm mx-2">
              <select className="bg-gray-100">
                <option>All Months</option>
              </select>
            </div>
            <div className="border rounded-md border-gray-400 text-sm mx-2">
              <select className="bg-gray-100">
                <option>All Types</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Category"
              className="focus:outline-none focus:ring focus:border-main placeholder-black border rounded-md border-gray-400 text-sm bg-gray-100 pl-1 mx-2"
            />
            <input
              type="text"
              placeholder="Subcategory"
              className="focus:outline-none focus:ring focus:border-main placeholder-black border rounded-md border-gray-400 text-sm bg-gray-100 pl-1 mx-2"
            />
            <input
              type="text"
              placeholder="Amount"
              className="focus:outline-none focus:ring focus:border-main placeholder-black border rounded-md border-gray-400 text-sm bg-gray-100 pl-1 mx-2"
            />
          </div>
          <span className="divider my-8 mx-16 bg-gray-200" />
        </main>
      </div>
    </div>
  </ProtectedWrapper>
);

export default data;
