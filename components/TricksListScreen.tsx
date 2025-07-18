import React, { useMemo } from 'react';
import { Skill } from '../types';
import ProgressBar from './ProgressBar';
import SkillCard from './SkillCard';

interface TricksListScreenProps {
  onBack: () => void;
  skills: Skill[];
  onToggleSkill: (id: number) => void;
  tier: number;
}

const TricksListScreen = ({ onBack, skills, onToggleSkill, tier }: TricksListScreenProps) => {
  const progress = useMemo(() => {
    if (!skills || skills.length === 0) return 0;
    const completedCount = skills.filter(s => s.completed).length;
    return (completedCount / skills.length) * 100;
  }, [skills]);

  const stars = "⭐".repeat(tier);

  return (
    <div className="w-full flex flex-col items-center gap-6 text-white animate-fade-in">
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
        
        <div className="w-full flex justify-start">
            <button
                onClick={onBack}
                className="text-white/80 hover:text-white transition-colors text-lg flex items-center gap-2"
                aria-label="Volver a la selección de jugador"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Volver
            </button>
        </div>

        <ProgressBar progress={progress} title={`PROGRESO ${stars}`} />

        <div className="w-full flex flex-col items-center gap-4 mt-4">
            {skills.map(skill => (
                <SkillCard key={skill.id} skill={skill} onToggle={onToggleSkill} />
            ))}
        </div>
    </div>
  );
};

export default TricksListScreen;
