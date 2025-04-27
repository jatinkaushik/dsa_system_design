import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-background to-[#f3f4f8] py-6 px-8 border-t border-border flex justify-between items-center text-text-secondary text-sm tablet:flex-col tablet:gap-4 tablet:py-5 tablet:px-4 tablet:text-center">
      <div className="flex items-center gap-2 mobile:text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary mobile:w-4 mobile:h-4">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
        <span>DSA & System Design Visualizer &copy; {currentYear}</span>
      </div>
      
      <div className="flex gap-6 mobile:gap-4 mobile:flex-wrap mobile:justify-center mobile:text-xs">
        <a href="#" className="text-text-secondary no-underline hover:text-primary transition-colors duration-fast">Privacy</a>
        <a href="#" className="text-text-secondary no-underline hover:text-primary transition-colors duration-fast">Terms</a>
        <a href="#" className="text-text-secondary no-underline hover:text-primary transition-colors duration-fast">Support</a>
        <a href="#" className="text-text-secondary no-underline hover:text-primary transition-colors duration-fast">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;