import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleLearningMode } from '../../store/learningModeSlice';

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const learningMode = useSelector((state: RootState) => state.learningMode.learningMode);

  return (
    <header
      className="w-full flex items-center justify-between px-6 py-3 h-16 bg-gradient-to-r from-[#3b82f6] to-[#4a51a7] shadow z-50"
    >
      <div className="text-xl font-bold tracking-tight">
        <Link href="/" className="text-white no-underline flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span className="mobile:hidden">DSA & System Design</span>
        </Link>
      </div>
      <div className="flex items-center gap-4 tablet:gap-2">
        {/* Kids Mode Toggle Button */}
        <button
          onClick={() => dispatch(toggleLearningMode())}
          className={`px-3 py-1.5 rounded-full font-medium transition-all duration-fast flex items-center gap-2 ${learningMode ? 'bg-yellow-300 text-yellow-900' : 'bg-white/20 text-white'} hover:bg-yellow-200`}
          title="Toggle Kids Mode"
        >
          {learningMode ? '🧒 Kids Mode: ON' : '🧒 Kids Mode'}
        </button>
        <button
          onClick={toggleSidebar}
          className="bg-transparent text-white shadow-none p-1.5 hidden tablet:flex hover:bg-white/10 hover:transform-none hover:shadow-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <nav className="flex gap-2 mobile:gap-1">
          <Link
            href="/"
            className={`text-white no-underline py-1.5 px-3 rounded-full font-medium transition-all duration-fast relative mobile:px-2 mobile:text-sm hover:bg-white/15 ${pathname === "/" ? "bg-white/20" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            href="/daily-review"
            className={`text-white no-underline py-1.5 px-3 rounded-full font-medium transition-all duration-fast relative mobile:px-2 mobile:text-sm hover:bg-white/15 ${pathname === "/daily-review" ? "bg-white/20" : ""}`}
          >
            Daily Review
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;