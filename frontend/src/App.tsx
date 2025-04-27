import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout components
import Header from './components/layout/Header.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import Footer from './components/layout/Footer.tsx';

// Page components
import Dashboard from './components/Dashboard.tsx';
import DailyReview from './components/DailyReview.tsx';
import QuickSortVisualization from './components/dsa/QuickSortVisualization.tsx';
import URLShortenerDesign from './components/systemDesign/URLShortenerDesign.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-container">
          <Sidebar />
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