import React from 'react';
import Link from 'next/link';

const Navbar = (): JSX.Element => (
  <nav className="max-w-screen-xl m-auto px-4">
    <div className="relative flex justify-start h-16">
      <div className="flex items-stretch flex-1 px-4">
        <div className="flex items-center">
          <Link href="/" passHref>
            <a href="replace" className="text-2xl font-semibold">
              Finance<strong className="text-main ml-0.5">OS</strong>
            </a>
          </Link>
        </div>
        <div className="flex items-center ml-6">
          <Link href="/about" passHref>
            <a href="replace" className="navLink">
              About
            </a>
          </Link>
          <Link href="/pricing" passHref>
            <a href="replace" className="navLink">
              Pricing
            </a>
          </Link>
          <Link href="/contact" passHref>
            <a href="replace" className="navLink">
              Contact
            </a>
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <Link href="/p" passHref>
          <a
            href="replace"
            className="flex button-main align-center justify-center text-sm px-4 py-2"
          >
            Get Started
          </a>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
