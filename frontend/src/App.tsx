import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components - Using relative imports to fix path resolution issues
import Dashboard from './components/Dashboard';
import DailyReview from './components/DailyReview';
import QuickSortVisualization from './components/dsa/QuickSortVisualization';
import URLShortenerDesign from './components/systemDesign/URLShortenerDesign';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Header toggleSidebar={toggleSidebar} />
        <div className="main-container">
          <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
          <main className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/daily-review" element={<DailyReview />} />
              <Route path="/algorithms/quicksort" element={<QuickSortVisualization />} />
              <Route path="/system-design/url-shortener" element={<URLShortenerDesign />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;