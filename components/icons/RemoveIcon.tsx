import React from 'react';

export const RemoveIcon = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
    <button 
      onClick={onClick} 
      aria-label="Remove Player" 
      className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-red-700 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-red-500"
    >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
);
