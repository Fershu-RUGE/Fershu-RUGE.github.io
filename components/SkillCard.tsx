
import React from 'react';
import { Skill } from '../types';
import { StarIcon } from './icons/StarIcon';

interface SkillCardProps {
  skill: Skill;
  onToggle: (id: number) => void;
}

const SkillCard = ({ skill, onToggle }: SkillCardProps) => {
  const { id, title, description, completed } = skill;

  const cardClasses = completed
    ? 'bg-[#4a8c82] border border-green-400/80 shadow-lg'
    : 'bg-transparent';
  
  const titleClasses = completed ? 'text-white' : 'text-white/90';
  const descriptionClasses = completed ? 'text-white/80' : 'text-white/60';

  return (
    <div
      onClick={() => onToggle(id)}
      className={`w-full max-w-sm p-4 rounded-xl transition-all duration-300 cursor-pointer ${cardClasses}`}
    >
      <div className="flex items-center gap-2">
        <h3 className={`text-xl font-bold ${titleClasses}`}>{title}</h3>
        {completed && (
          <>
            <StarIcon className="text-[#fecb00]" />
            <span className="text-sm font-bold text-yellow-300">(REALIZADO)</span>
          </>
        )}
      </div>
      <p className={`text-sm mt-1 ${descriptionClasses}`}>{description}</p>
    </div>
  );
};

export default SkillCard;
