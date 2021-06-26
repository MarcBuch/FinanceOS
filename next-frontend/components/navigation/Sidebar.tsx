import React from 'react';
import Link from 'next/link';

import {
  faChartPie,
  faDatabase,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import SidebarLink from './SidebarLink';

const Sidebar = (): JSX.Element => (
  <div className="relative flex w-full h-screen max-h-sm sm:w-64">
    <div className="flex flex-col flex-grow py-5 truncate bg-gray-700">
      <div className="flex items-center justify-center my-3">
        <Link href="/" passHref>
          <a href="replace" className="text-2xl font-semibold text-white">
            Finance<strong className="text-purple-500 ml-0.5">OS</strong>
          </a>
        </Link>
        <span className="text-sm text-gray-400 ml-1">Testing</span>
      </div>
      <nav className="flex flex-col flex-1 overflow-y-auto divide-y divide-gray-800">
        <div className="px-2 py-4 space-y-1">
          <SidebarLink text="Dashboard" link="/p/dashboard" icon={faChartPie} />
          <SidebarLink text="Data" link="/p/data" icon={faDatabase} />
        </div>
        <div className="px-2 py-4 space-y-1">
          <SidebarLink text="Account" link="p/account" icon={faUser} />
        </div>
      </nav>
    </div>
  </div>
);

export default Sidebar;
