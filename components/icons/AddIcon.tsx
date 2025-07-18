import React from 'react';

export const AddIcon = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick} 
    aria-label="Add Player" 
    className="w-16 h-16 rounded-full bg-[#54a557] flex items-center justify-center shadow-lg border-4 border-gray-400 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-[#2a6f89]"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  </button>
);
