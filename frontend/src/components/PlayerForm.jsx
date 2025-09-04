import { useState } from "react";

export default function PlayerForm({ players, setPlayers }) {
  const [playerName, setPlayerName] = useState("");

  const addPlayer = () => {
    if (!playerName.trim()) return;
    setPlayers([
      ...players,
      { name: playerName.trim(), scores: [0], totalScore: 0 },
    ]);
    setPlayerName("");
  };

  return (
    <div className="mb-4 flex items-center gap-2">
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Player Name"
        className="border rounded px-2 py-1"
      />
      <button
        onClick={addPlayer}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add Player
      </button>
    </div>
  );
}
