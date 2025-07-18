import React from 'react';

interface ProgressBarProps {
  progress: number;
  title?: string;
}

const ProgressBar = ({ progress, title = "PROGRESO" }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-sm px-4">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <div className="w-full bg-black rounded-full h-5 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-[#fecb00] to-yellow-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
