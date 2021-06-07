import React from 'react';
import Link from 'next/link';

const Navbar = (): JSX.Element => (
  <div className="m-2 flex space-x-4 text-lg">
    <Link href="/" passHref>
      <a href="replace" className="text-2xl font-semibold">
        Finance<strong className="textcolor-main">OS</strong>
      </a>
    </Link>
    <Link href="/about" passHref>
      <a href="replace" className="pt-1">
        About
      </a>
    </Link>
  </div>
);

export default Navbar;
