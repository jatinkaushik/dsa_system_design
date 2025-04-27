import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Create a context for Learning Mode that can be used across the app
export const LearningModeContext = React.createContext({
  learningMode: false,
  toggleLearningMode: () => {}
});

// Custom hook to use the Learning Mode context
export const useLearningMode = () => useContext(LearningModeContext);

const Sidebar: React.FC<{isOpen: boolean; closeSidebar: () => void}> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const [learningMode, setLearningMode] = useState(false);
  
  const toggleLearningMode = () => {
    setLearningMode(!learningMode);
  };
  
  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  }, [location.pathname, closeSidebar]);
  
  return (
    <LearningModeContext.Provider value={{ learningMode, toggleLearningMode }}>
      {/* Overlay for mobile */}
      <div 
        className={`fixed top-12 left-0 right-0 bottom-0 bg-black/50 z-80 tablet:block ${isOpen ? 'tablet:block' : 'hidden'}`}
        onClick={closeSidebar}
      />
      
      {/* Sidebar container */}
      <aside 
        className={`w-[280px] bg-surface border-r border-border h-full transition-all duration-normal shadow-sm overflow-y-auto py-6 tablet:fixed tablet:top-12 tablet:h-[calc(100%-48px)] tablet:z-90 ${isOpen ? 'tablet:left-0 tablet:shadow-lg' : 'tablet:left-[-280px] tablet:shadow-none'}`}
      >
        {/* Learning Mode Toggle */}
        <div className="px-6 mb-6">
          <div 
            className={`flex items-center justify-between ${learningMode ? 'bg-primary/10 border border-primary/30' : 'bg-black/[0.03] border border-transparent'} p-3 rounded-lg transition-all duration-fast cursor-pointer hover:bg-primary/15`}
            onClick={toggleLearningMode}
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
              <div>
                <div className="font-medium text-sm">Learning Mode</div>
                <div className="text-xs text-text-secondary mt-1">Kid-friendly explanations</div>
              </div>
            </div>
            <div className={`relative w-9 h-5 ${learningMode ? 'bg-primary' : 'bg-border'} rounded-full transition-all duration-fast`}>
              <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-all duration-fast shadow-sm ${learningMode ? 'left-[18px]' : 'left-0.5'}`}></div>
            </div>
          </div>
        </div>
        
        {/* Content sections */}
        <div className="text-sm text-text-secondary uppercase tracking-wide px-6 mb-2 font-medium">Algorithms</div>
        <ul className="list-none p-0 mb-1">
          <li className="mb-1">
            <Link 
              to="/algorithms/quicksort" 
              className={`flex items-center py-3 px-6 text-text-primary no-underline transition-all duration-fast rounded-r-lg relative font-medium gap-3 hover:bg-primary/10 hover:text-primary ${location.pathname === "/algorithms/quicksort" ? "bg-primary/15 text-primary font-semibold" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 opacity-70">
                <path d="M16 16v-8h-8"></path>
                <path d="M19 9l-3-3-3 3"></path>
                <path d="M8 8l-3 3 3 3"></path>
              </svg>
              Quick Sort
            </Link>
          </li>
        </ul>
        
        <div className="text-sm text-text-secondary uppercase tracking-wide px-6 mb-2 mt-6 font-medium">System Design</div>
        <ul className="list-none p-0 mb-1">
          <li className="mb-1">
            <Link 
              to="/system-design/url-shortener" 
              className={`flex items-center py-3 px-6 text-text-primary no-underline transition-all duration-fast rounded-r-lg relative font-medium gap-3 hover:bg-primary/10 hover:text-primary ${location.pathname === "/system-design/url-shortener" ? "bg-primary/15 text-primary font-semibold" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 opacity-70">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              URL Shortener
            </Link>
          </li>
        </ul>
        
        {/* Profile Section */}
        <div className="mt-auto px-6 py-4 flex items-center gap-3 border-t border-border mt-6">
          <div className="w-10 h-10 bg-primary bg-opacity-20 text-primary rounded-full flex items-center justify-center font-medium">U</div>
          <div>
            <div className="font-medium text-sm">User</div>
            <div className="text-xs text-text-secondary">Developer</div>
          </div>
        </div>
      </aside>
    </LearningModeContext.Provider>
  );
};

export default Sidebar;