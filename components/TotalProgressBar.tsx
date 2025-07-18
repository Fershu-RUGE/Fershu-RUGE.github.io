import React from 'react';

interface TotalProgressBarProps {
  playerName: string;
  progress: number;
}

const TotalProgressBar = ({ playerName, progress }: TotalProgressBarProps) => {
  return (
    <div className="w-full max-w-sm px-4 flex flex-col gap-2">
      <h2 className="text-lg font-bold text-white tracking-wider">PROGRESO TOTAL {playerName}</h2>
      <div className="w-full bg-black rounded-full h-5 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-[#fecb00] to-yellow-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TotalProgressBar;