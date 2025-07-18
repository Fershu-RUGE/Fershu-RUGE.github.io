

import React, { useState, useMemo, useEffect } from 'react';
import { Player, Skill } from './types';
import PlayerSelection from './components/PlayerSelection';
import TotalProgressBar from './components/TotalProgressBar';
import SkillTierRow from './components/SkillTierRow';
import TricksListScreen from './components/TricksListScreen';

const initialSkills: Skill[] = [
  // 1 Star
  { id: 1, title: 'Túnel dirigido', description: 'mantener L1 + R1 y mover R3 en cualquier dirección', completed: false, tier: 1 },
  { id: 2, title: 'Malabares con el balón (estático)', description: 'mantener L2 + pulsar R1', completed: false, tier: 1 },
  { id: 3, title: 'Amago de tiro a la izquierda', description: 'mantener L1 + Cuadrado o Círculo y luego X + L3 en diagonal hacia arriba a la izquierda', completed: false, tier: 1 },
  { id: 4, title: 'Amago de tiro a la derecha', description: 'mantener L1 + Cuadrado o Círculo y luego X + L3 en diagonal hacia arriba a la derecha', completed: false, tier: 1 },
  { id: 5, title: 'Levantar el balón', description: 'pulsar R3', completed: false, tier: 1 },
  { id: 6, title: 'Amago de giro al primer toque', description: 'mantener L1 + R1 + L3 hacia abajo', completed: false, tier: 1 },
  { id: 7, title: 'Elástico', description: 'Mover R3 de derecha a izquierda', completed: false, tier: 1 },
  { id: 8, title: 'Elástico Inverso', description: 'Mover R3 de izquierda a derecha', completed: false, tier: 1 },
  // 2 Stars
  { id: 9, title: 'Finta hacia delante y giro', description: 'R3 toque abajo y después otra vez abajo', completed: false, tier: 2 },
  { id: 10, title: 'Finta del cuerpo derecha', description: 'R3 toque hacia la izquierda', completed: false, tier: 2 },
  { id: 11, title: 'Finta del cuerpo izquierda', description: 'R3 toque hacia la derecha', completed: false, tier: 2 },
  { id: 12, title: 'Bicicleta derecha', description: 'R3 toque arriba y rotar hacia la derecha', completed: false, tier: 2 },
  { id: 13, title: 'Bicicleta izquierda', description: 'R3 toque arriba y rotar hacia la izquierda', completed: false, tier: 2 },
  { id: 14, title: 'Bicicleta inversa derecha', description: 'R3 toque derecha y rotar hacia arriba', completed: false, tier: 2 },
  { id: 15, title: 'Bicicleta inversa izquierda', description: 'R3 toque izquierda y rotar hacia arriba', completed: false, tier: 2 },
  { id: 16, title: 'Arrastre de balón a la izquierda', description: 'mantener R3 a la izquierda', completed: false, tier: 2 },
  { id: 17, title: 'Arrastre de balón a la derecha', description: 'mantener R3 a la derecha', completed: false, tier: 2 },
  { id: 18, title: 'Arrastrar atrás', description: 'L1 + R1 + L3 toque abajo', completed: false, tier: 2 },
  { id: 19, title: 'Finta amplia', description: 'mantener L2 + R3 a la izquierda o a la derecha (+ L3 en dirección de salida)', completed: false, tier: 2 },
  { id: 20, title: 'Parar y correr', description: 'mantener L2 + R3 hacia abajo, hacia arriba', completed: false, tier: 2 },
  // 3 Stars
  { id: 21, title: 'Toque de tacón', description: 'R3 toque arriba y toque abajo', completed: false, tier: 3 },
  { id: 22, title: 'Ruleta derecha', description: 'rotar R3 (270°) desde abajo a la derecha en sentido horario', completed: false, tier: 3 },
  { id: 23, title: 'Ruleta izquierda', description: 'rotar R3 (270°) desde abajo a la izquierda en sentido antihorario', completed: false, tier: 3 },
  { id: 24, title: 'Amagar a la izquierda y salir por la derecha', description: 'rotar R3 (180°) desde la izquierda a la derecha en sentido antihorario', completed: false, tier: 3 },
  { id: 25, title: 'Amagar a la derecha y salir por la izquierda', description: 'rotar R3 (180°) desde la derecha a la izquierda en sentido horario', completed: false, tier: 3 },
  { id: 26, title: 'Taconazo a la izquierda (en carrera)', description: 'mantener L2 + Círculo o Cuadrado y X + L3 mantener a la izquierda', completed: false, tier: 3 },
  { id: 27, title: 'Taconazo a la derecha (en carrera)', description: 'mantener L2 + Círculo o Cuadrado y X + L3 mantener a la derecha', completed: false, tier: 3 },
  { id: 28, title: 'Finta por la izquierda y salir por la derecha', description: 'rotar R3 (180°) desde la izquierda a la derecha en sentido antihorario', completed: false, tier: 3 },
  { id: 29, title: 'Finta por la derecha y salir por la izquierda', description: 'rotar R3 (180°) desde la derecha a la izquierda en sentido horario', completed: false, tier: 3 },
  { id: 30, title: 'Finta de tirones', description: 'mantener pulsado L2 + mover R3 a la izquierda y luego a la derecha (o viceversa)', completed: false, tier: 3 },
  // 4 Stars
  { id: 31, title: 'Salto con balón (estático)', description: 'mantener L1 + pulsar R3', completed: false, tier: 4 },
  { id: 32, title: 'Arrastre del balón', description: 'L1 + toque R3 hacia arriba, izquierda o derecha', completed: false, tier: 4 },
  { id: 33, title: 'Giro y arrastrar', description: 'mantener L2 + mantener R3 hacia abajo', completed: false, tier: 4 },
  { id: 34, title: 'Caños con clase', description: 'mantener L1 + R1 + R3 en cualquier dirección', completed: false, tier: 4 },
  { id: 35, title: 'Tacón a tacón', description: 'R3 toque arriba y toque abajo', completed: false, tier: 4 },
  { id: 36, title: 'Sombrero de espuela sencillo', description: 'R3 toque abajo y toque arriba', completed: false, tier: 4 },
  { id: 37, title: 'Giro a la izquierda', description: 'mantener R1 + R3 hacia abajo y rotar 270° a la derecha', completed: false, tier: 4 },
  { id: 38, title: 'Giro a la derecha', description: 'mantener R1 + R3 hacia abajo y rotar 270° a la izquierda', completed: false, tier: 4 },
  { id: 39, title: 'Parar y girar a la izquierda (en carrera)', description: 'R3 toque arriba, toque izquierda', completed: false, tier: 4 },
  { id: 40, title: 'Parar y girar a la derecha (en carrera)', description: 'R3 toque arriba, toque derecha', completed: false, tier: 4 },
  { id: 41, title: 'Arrastre de balón con recorte a la izquierda', description: 'mantener R3 a la derecha y mantener L3 a la izquierda', completed: false, tier: 4 },
  { id: 42, title: 'Arrastre de balón con recorte a la derecha', description: 'mantener R3 a la izquierda y mantener L3 a la derecha', completed: false, tier: 4 },
  { id: 43, title: 'Amagar pase (sin moverse)', description: 'mantener R2 + Círculo o Cuadrado y X', completed: false, tier: 4 },
  { id: 44, title: 'Amagar pase y salir por la izquierda (sin moverse)', description: 'mantener R2 + Círculo o Cuadrado y X + L3 toque izquierda y arriba', completed: false, tier: 4 },
  { id: 45, title: 'Amagar pase y salir por la derecha (sin moverse)', description: 'mantener R2 + Círculo o Cuadrado y X + L3 toque derecha y arriba', completed: false, tier: 4 },
  { id: 46, title: 'Arrastres de balon rapidos', description: 'mantener R3 hacia abajo', completed: false, tier: 4 },
  { id: 47, title: 'Trasladarse a la izquierda', description: 'mantener L1 + R3 mantener a la izquierda', completed: false, tier: 4 },
  { id: 48, title: 'Trasladarse a la derecha', description: 'mantener L1 + R3 mantener a la derecha', completed: false, tier: 4 },
  { id: 49, title: 'Ruleta de tres toques a la izquierda', description: 'mantener L2 + R3 toque abajo, toque izquierda', completed: false, tier: 4 },
  { id: 50, title: 'Ruleta de tres toques a la derecha', description: 'mantener L2 + R3 toque abajo, toque derecha', completed: false, tier: 4 },
  { id: 51, title: 'Arrastrar atrás y giro a la izquierda', description: 'mantener L2 + R3 toque arriba, toque izquierda', completed: false, tier: 4 },
  { id: 52, title: 'Arrastrar atrás y giro a la derecha', description: 'mantener L2 + R3 toque arriba, toque derecha', completed: false, tier: 4 },
  { id: 53, title: 'Pisada al tacón', description: 'mantener L1 + R3 toque abajo, izquierda o derecha', completed: false, tier: 4 },
  { id: 54, title: 'Arrastre de tacón a balón', description: 'mantener L1 + R3 toque arriba y abajo', completed: false, tier: 4 },
  { id: 55, title: 'Arrastre de balón con recorte', description: 'mantener L1 + R3 dos toques seguidos hacia abajo', completed: false, tier: 4 },
  { id: 56, title: 'Paso por delante del balón', description: 'mantener L1 + R3 hacia arriba, a la izquierda o a la derecha', completed: false, tier: 4 },
  // 5 Stars
  { id: 57, title: 'Bicicleta con el exterior', description: 'mantener L1 + gira R3 a la derecha, hacia abajo y a la izquierda (o viceversa)', completed: false, tier: 5 },
  { id: 58, title: 'Elástica', description: 'rotar R3 (180°) de derecha a izquierda en sentido horario', completed: false, tier: 5 },
  { id: 59, title: 'Elástica inversa', description: 'rotar R3 (180°) de izquierda a derecha en sentido antihorario', completed: false, tier: 5 },
  { id: 60, title: 'Sombrero de espuela avanzado', description: 'R3 toque abajo, R3 mantener arriba, R3 toque arriba', completed: false, tier: 5 },
  { id: 61, title: 'Abracadabra', description: 'rotar R3 (45°) de abajo hacia la izquierda, y luego rotar R3 (180°) hacia la derecha', completed: false, tier: 5 },
  { id: 62, title: 'Triple elástica', description: 'rotar R3 (45°) de abajo hacia la derecha, y luego rotar R3 (180°) hacia la izquierda', completed: false, tier: 5 },
  { id: 63, title: 'Arrastre de balón y toque izquierdo (en carrera)', description: 'R3 mantener a la izquierda, toque arriba', completed: false, tier: 5 },
  { id: 64, title: 'Arrastre de balón y toque derecho (en carrera)', description: 'R3 mantener a la derecha, toque arriba', completed: false, tier: 5 },
  { id: 65, title: 'Toque de tacón y giro', description: 'mantener R1 + R3 toque arriba, toque abajo', completed: false, tier: 5 },
  { id: 66, title: 'Toque de sombrero (estático)', description: 'R3 toque arriba, toque arriba, toque abajo', completed: false, tier: 5 },
  { id: 67, title: 'Torcer y giro izquierda', description: 'R3 toque arriba, toque izquierda', completed: false, tier: 5 },
  { id: 68, title: 'Torcer y giro derecha', description: 'R3 toque arriba, toque derecha', completed: false, tier: 5 },
  { id: 69, title: 'Amago de envío a la izquierda (en estático)', description: 'mantener R3 a la izquierda y luego toque a la derecha', completed: false, tier: 5 },
  { id: 70, title: 'Amago de envío a la derecha (en estático)', description: 'mantener R3 a la derecha y luego toque a la izquierda', completed: false, tier: 5 },
  { id: 71, title: 'Arrastre de balón con amago de giro', description: 'mantener L2 + L3 toque hacia arriba y toque hacia la izquierda o derecha', completed: false, tier: 5 },
  { id: 72, title: 'Amago de rabona (mientras se pulsa)', description: 'L2 + círculo o cuadrado y X + L3 toque abajo', completed: false, tier: 5 },
  { id: 73, title: 'Arrastrar atrás y giro a la izquierda', description: 'L2 + R1 (mantener) + rotar R3 (180°) de derecha a izquierda', completed: false, tier: 5 },
  { id: 74, title: 'Arrastrar atrás y giro a la derecha', description: 'L2 + R1 (mantener) + rotar R3 (180°) de izquierda a derecha', completed: false, tier: 5 },
  { id: 75, title: 'Giro y toque', description: 'L2 + R1 (mantener) + R3 toque arriba y toque a la derecha', completed: false, tier: 5 },
  { id: 76, title: 'Toque por encima', description: 'R3 mantener arriba', completed: false, tier: 5 },
  { id: 77, title: 'Tornado', description: 'mantener L1 + toque arriba y toque a la izquierda', completed: false, tier: 5 },
  { id: 78, title: 'Finta de tacón', description: 'mantener L2 + R3 toque a la derecha y a la izquierda (puedes hacerlo al revés)', completed: false, tier: 5 },
  { id: 79, title: 'Sombrero con clase', description: 'mantener L1 + toque abajo y toque arriba', completed: false, tier: 5 },
  { id: 80, title: 'Nuevo truco de amagos de tiro', description: 'Cuadrado/Círculo + X + L3 en cualquier dirección (en estático o en carrera)', completed: false, tier: 5 },
];


function App() {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('fifa-players');
    return saved ? JSON.parse(saved) : [{ id: 1, name: 'P1', skills: JSON.parse(JSON.stringify(initialSkills)) }];
  });
  
  const [activePlayerId, setActivePlayerId] = useState<number>(1);
  
  const [nextPlayerId, setNextPlayerId] = useState(() => {
    const saved = localStorage.getItem('fifa-nextPlayerId');
    return saved ? JSON.parse(saved) : 2;
  });

  const [view, setView] = useState<'progress' | 'tricks'>('progress');
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  
  useEffect(() => {
    localStorage.setItem('fifa-players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('fifa-nextPlayerId', JSON.stringify(nextPlayerId));
  }, [nextPlayerId]);

  const activePlayer = useMemo(() => players.find(p => p.id === activePlayerId), [players, activePlayerId]);

  const activePlayerProgress = useMemo(() => {
    if (!activePlayer || !activePlayer.skills || activePlayer.skills.length === 0) {
      return 0;
    }
    const completedCount = activePlayer.skills.filter(s => s.completed).length;
    return (completedCount / activePlayer.skills.length) * 100;
  }, [activePlayer]);

  const calculateTierProgress = (tier: number) => {
    if (!activePlayer || !activePlayer.skills) return 0;
    const tierSkills = activePlayer.skills.filter(s => s.tier === tier);
    if (tierSkills.length === 0) return 0;
    const completedCount = tierSkills.filter(s => s.completed).length;
    return (completedCount / tierSkills.length) * 100;
  };

  const skillsForSelectedTier = useMemo(() => {
    if (!activePlayer || selectedTier === null) return [];
    return activePlayer.skills.filter(s => s.tier === selectedTier);
  }, [activePlayer, selectedTier]);

  const handleSelectPlayer = (id: number) => {
    setActivePlayerId(id);
  };

  const handleAddPlayer = () => {
    const newPlayer: Player = {
      id: nextPlayerId,
      name: `P${nextPlayerId}`,
      skills: JSON.parse(JSON.stringify(initialSkills)),
    };
    setPlayers(prev => [...prev, newPlayer]);
    setNextPlayerId(prev => prev + 1);
    setActivePlayerId(newPlayer.id);
  };
  
  const handleRemovePlayer = (id: number) => {
    if (id === 1) return; // Safeguard: P1 cannot be removed.
    setPlayers(prev => prev.filter(p => p.id !== id));
    if (activePlayerId === id) {
      setActivePlayerId(1); // Default to P1 if the active player is removed.
    }
  };

  const handleToggleSkill = (skillId: number) => {
    setPlayers(currentPlayers =>
      currentPlayers.map(player => {
        if (player.id === activePlayerId) {
          return {
            ...player,
            skills: player.skills.map(skill =>
              skill.id === skillId
                ? { ...skill, completed: !skill.completed }
                : skill
            ),
          };
        }
        return player;
      })
    );
  };

  const handleTierSelect = (tier: number) => {
    setSelectedTier(tier);
    setView('tricks');
  };

  if (!activePlayer) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 font-sans bg-[#2a6f89]">
            <p className="text-white">Cargando jugador...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-sans">
      <main className="bg-[#2a6f89] w-full max-w-md rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-8">
        {view === 'progress' ? (
          <>
            <PlayerSelection 
              players={players}
              activePlayerId={activePlayerId}
              onSelectPlayer={handleSelectPlayer}
              onAddPlayer={handleAddPlayer}
              onRemovePlayer={handleRemovePlayer}
            />
            <TotalProgressBar 
              playerName={activePlayer.name.toUpperCase()} 
              progress={activePlayerProgress}
            />
            <div className="w-full flex flex-col items-center gap-4">
               {Array.from({ length: 5 }).map((_, i) => (
                 <SkillTierRow 
                    key={i} 
                    stars={i + 1} 
                    onClick={() => handleTierSelect(i + 1)}
                    progress={calculateTierProgress(i + 1)}
                  />
              ))}
            </div>
          </>
        ) : (
            <TricksListScreen 
              onBack={() => setView('progress')}
              skills={skillsForSelectedTier}
              onToggleSkill={handleToggleSkill}
              tier={selectedTier || 0}
            />
        )}
      </main>
    </div>
  );
}

export default App;