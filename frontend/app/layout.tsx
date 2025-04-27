'use client';

import React, { useState } from 'react';
import "../src/index.css";
import Header from '../src/components/layout/Header';
import Sidebar from '../src/components/layout/Sidebar';
import Footer from '../src/components/layout/Footer';
import { Provider } from 'react-redux';
import store from '../src/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="app">
            <Header toggleSidebar={toggleSidebar} />
            <div className="main-container">
              <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
              <main className="content">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}