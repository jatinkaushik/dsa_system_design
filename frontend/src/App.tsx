import React, { useState, createContext, useContext } from 'react';
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

// Create and export Learning Mode context and hook
export const LearningModeContext = createContext<{ learningMode: boolean; toggleLearningMode: () => void }>({ learningMode: false, toggleLearningMode: () => {} });
export const useLearningMode = () => useContext(LearningModeContext);

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [learningMode, setLearningMode] = useState(false); // Manage state here

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleLearningMode = () => { // Define toggle function here
    setLearningMode(!learningMode);
  };

  return (
    <Router>
      {/* Wrap the entire app structure with the Provider */}
      <LearningModeContext.Provider value={{ learningMode, toggleLearningMode }}>
        <div className="app">
          <Header toggleSidebar={toggleSidebar} />
          <div className="main-container">
            {/* Sidebar now consumes the context */}
            <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <main className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/daily-review" element={<DailyReview />} />
                {/* QuickSortVisualization will consume the context */}
                <Route path="/algorithms/quicksort" element={<QuickSortVisualization />} />
                <Route path="/system-design/url-shortener" element={<URLShortenerDesign />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </LearningModeContext.Provider>
    </Router>
  );
};

export default App;