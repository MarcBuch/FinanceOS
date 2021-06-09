import React from 'react';
import Link from 'next/link';

// Components
import Navbar from '../components/Navbar';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <div>
        <div className="relative pt-16 pb-16">
          <div className="max-w-screen-xl mx-auto flex">
            <div className="relative mb-10 pt-32">
              <main className="max-w-screen-xl px-4 mx-auto">
                <h2 className="text-6xl font-extrabold text-main tracking-tight">
                  One Finance Tool
                  <br />
                  to Rule Them All
                </h2>
                <p className="mt-4 text-xl max-w-sm">
                  FinanceOS provides an easy way to visualize and analyze your
                  path to FIRE.
                </p>
                <div className="justify-start mt-5 flex">
                  <div className="rounded-md">
                    <Link href="/p" passHref>
                      <a
                        href="replace"
                        className="button-main flex align-center justify-center w-full px-8 py-4 rounded-md text-lg text-transparent"
                      >
                        Sign up for free
                      </a>
                    </Link>
                  </div>
                  <div className="ml-3 rounded-md">
                    <Link href="/p" passHref>
                      <a
                        href="replace"
                        className="flex align-center justify-center w-full px-8 py-4 rounded-md border border-main text-lg text-main"
                      >
                        Demo
                      </a>
                    </Link>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
