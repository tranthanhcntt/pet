import React, { useEffect } from "react";
import ModeratorView from "@/components/organisms/ModeratorView";
import usePersistentState from "@/hooks/usePersistentState";
import { PLAYERS } from '@/constants';

export const WereWolves = () => {
  const [players, setPlayers] = usePersistentState("ww_players", []);
  const [phase, setPhase] = usePersistentState("ww_phase", 4);

  useEffect(() => {
    if (players.length === 0) {
      setPlayers([...PLAYERS]);
    }
  }, [players, setPlayers]);

  const handleReset = () => {
    setPlayers([...PLAYERS]);
    setPhase(4);
  };

  return (
    <div key={phase} className="p-4">
      <div className="flex justify-between mb-4 flex-col">
        <h1 className="text-2xl font-bold mb-1">🧙 Trò chơi Ma Sói</h1>
        <button 
          onClick={handleReset} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
      
      <ModeratorView players={players} setPlayers={setPlayers} phase={phase} setPhase={setPhase} />
    </div>
  );
}

export default WereWolves;