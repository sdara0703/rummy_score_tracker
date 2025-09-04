import { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import ScoreTable from "./components/ScoreTable";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [targetScore, setTargetScore] = useState(201);

  const resetGame = () => {
    if (window.confirm("Start a new game? All current scores will be lost.")) {
      setPlayers([]);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rummy Tracker</h1>

      <div className="mb-4 flex items-center gap-4">
        <label className="mr-2 font-semibold">Target Score:</label>
        <input
          type="number"
          value={targetScore}
          onChange={(e) => setTargetScore(Number(e.target.value))}
          className="w-24 border rounded px-2 py-1"
        />
        <button
          onClick={resetGame}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Reset Game
        </button>
      </div>

      <PlayerForm players={players} setPlayers={setPlayers} />

      <ScoreTable players={players} setPlayers={setPlayers} targetScore={targetScore} />
    </div>
  );
}
