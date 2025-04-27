import React from 'react';

const DailyReview: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Daily Review</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">
          This is the daily review section where you'll be able to review algorithms and system designs according to a spaced repetition schedule.
        </p>
        <p className="mt-4 text-center text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
};

export default DailyReview;