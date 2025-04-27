'use client';

import React from 'react';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  // Mock data for items due for review - commented out until used
  // const reviewItems = [
  //   { id: '1', name: 'Quick Sort', type: 'algorithm' },
  //   { id: '2', name: 'URL Shortener', type: 'systemDesign' },
  // ];
  
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-10 rounded-lg shadow-lg relative overflow-hidden tablet:p-6">
        <h2 className="mb-4 text-4xl font-bold tracking-tight tablet:text-3xl mobile:text-2xl">Welcome to DSA & System Design Visualizer</h2>
        <p className="text-lg mb-7 leading-relaxed max-w-[80%] opacity-90 tablet:text-base tablet:max-w-full mobile:text-sm">
          An interactive learning platform to master data structures, algorithms,
          and system design through visual learning and spaced repetition.
        </p>
        <Link
          href="/daily-review"
          className="inline-flex items-center gap-2 bg-white text-primary py-3 px-7 rounded-full font-semibold text-base transition-all duration-normal shadow-md hover:-translate-y-1 hover:shadow-lg mobile:w-full mobile:justify-center mobile:py-3 mobile:px-4 mobile:text-sm"
        >
          Start Daily Review
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
      
      <h1 className="mb-6 font-bold">Explore</h1>
      
      <p className="text-center text-gray-500">
        Please check back later for more content.
      </p>
    </div>
  );
};

export default Dashboard;