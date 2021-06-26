import React from 'react';
import Link from 'next/link';

import { faChartPie, faDatabase } from '@fortawesome/free-solid-svg-icons';

import SidebarLink from './SidebarLink';

const Sidebar = (): JSX.Element => (
  <div className="relative flex w-full h-screen max-h-sm sm:w-64">
    <div className="flex flex-col flex-grow py-5 truncate bg-gray-700">
      <div className="flex items-center px-4 mt-2 mb-5">
        <Link href="/" passHref>
          <a href="replace" className="text-2xl font-semibold text-white">
            Finance<strong className="text-main ml-0.5">OS</strong>
          </a>
        </Link>
      </div>
      <nav className="flex flex-col flex-1 mt-5">
        <div className="px-2 pb-4 space-y-1">
          <SidebarLink text="Dashboard" link="/p/dashboard" icon={faChartPie} />
          <SidebarLink text="Data" link="/p/data" icon={faDatabase} />
        </div>
      </nav>
    </div>
  </div>
);

export default Sidebar;
