import React, { Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RibbonBackground from '../components/RibbonBackground';
import FloatingCart from '../components/FloatingCart';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen relative bg-slate-50 text-slate-900 flex flex-col overflow-x-hidden">
      {/* Infinite Folded Ribbon Background */}
      <RibbonBackground />

      <Header />

      <main className="flex-grow z-10 pt-20">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              Loading Content...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />

      {/* Lead Capture Shortcut */}
      <FloatingCart />
    </div>
  );
}
