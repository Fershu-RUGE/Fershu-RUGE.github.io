import React from 'react';
import { Player } from '../types';
import { AddIcon } from './icons/AddIcon';
import { RemoveIcon } from './icons/RemoveIcon';

interface PlayerSelectionProps {
  players: Player[];
  activePlayerId: number | null;
  onSelectPlayer: (id: number) => void;
  onAddPlayer: () => void;
  onRemovePlayer: (id: number) => void;
}

const PlayerSelection = ({ players, activePlayerId, onSelectPlayer, onAddPlayer, onRemovePlayer }: PlayerSelectionProps) => {

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent selection when removing
    onRemovePlayer(id);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
       <div className="w-full relative text-center">
         <h1 className="text-3xl font-bold text-white tracking-widest">FIFA TRUCOS</h1>
       </div>
       <div className="flex items-center justify-center gap-4 flex-wrap">
          {players.map(player => (
            <button
              key={player.id}
              onClick={() => onSelectPlayer(player.id)}
              className="relative focus:outline-none"
              aria-label={`Select Player ${player.name}`}
            >
              <div 
                className={`w-16 h-16 bg-[#f07c41] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ring-offset-[#2a6f89] ${activePlayerId === player.id ? 'ring-4 ring-offset-2 ring-white' : ''}`}
              >
                  <span className="text-white text-3xl font-bold">{player.name}</span>
              </div>
              {player.id !== 1 && (
                <RemoveIcon onClick={(e) => handleRemove(e, player.id)} />
              )}
            </button>
          ))}
          <AddIcon onClick={onAddPlayer} />
       </div>
    </div>
  );
};

export default PlayerSelection;