import React from 'react';
import { StarIcon } from './icons/StarIcon';

interface SkillTierRowProps {
  stars: number;
  progress: number;
  onClick?: () => void;
}

const SkillTierRow = ({ stars, progress, onClick }: SkillTierRowProps) => {
  const isClickable = !!onClick;

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`w-full max-w-sm flex flex-col gap-2 text-left ${isClickable ? 'cursor-pointer hover:bg-white/10 rounded-lg transition-colors p-2' : 'p-2'}`}
      aria-label={`Trucos de ${stars} estrellas`}
    >
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold text-white tracking-wider">TRUCOS</h3>
        {Array.from({ length: stars }).map((_, i) => (
          <StarIcon key={i} className="text-yellow-400 w-5 h-5" />
        ))}
      </div>
      <div className="w-full bg-black rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </button>
  );
};

export default SkillTierRow;
