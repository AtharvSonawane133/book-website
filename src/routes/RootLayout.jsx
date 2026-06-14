import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function RootLayout() {
  const loc = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[30vh]" />}> 
          <Outlet key={loc.pathname} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}

