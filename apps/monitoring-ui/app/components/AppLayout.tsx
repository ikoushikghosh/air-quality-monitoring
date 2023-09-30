import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';

interface Props {
  pageTitle?: string;
  children?: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ pageTitle, children }) => {
  return (
    <div>
      <Head>
        <title>{pageTitle || 'Air Quality Monitoring'}</title>
        <meta
          name="description"
          content="Display Rank based country wise results by air quality index."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-7xl m-auto">
        <div>
          <Navbar />
          <div className="mt-4">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
