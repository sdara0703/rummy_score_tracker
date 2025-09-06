import { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import ScoreTable from "./components/ScoreTable";
import ScoreChart from "./components/ScoreChart";
import SettlementTable from "./components/SettlementTable";

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
<h1 className="text-2xl font-bold mb-4 text-center">
  <span className="text-red-500">R</span>
  <span className="text-orange-500">u</span>
  <span className="text-yellow-500">m</span>
  <span className="text-green-500">m</span>
  <span className="text-blue-500">y</span>{" "}
  <span className="text-indigo-500">S</span>
  <span className="text-purple-500">c</span>
  <span className="text-pink-500">o</span>
  <span className="text-red-400">r</span>
  <span className="text-orange-400">e</span>{" "}
  <span className="text-yellow-400">T</span>
  <span className="text-green-400">r</span>
  <span className="text-blue-400">a</span>
  <span className="text-indigo-400">c</span>
  <span className="text-purple-400">k</span>
  <span className="text-pink-400">e</span>
  <span className="text-red-300">r</span>
</h1>


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
<button
  onClick={() => {
    if (players.length === 0) return;
    const utterance = new SpeechSynthesisUtterance(
      players
        .map((p) => `${p.name}, total ${p.totalScore}`)
        .join(". ")
    );
    speechSynthesis.speak(utterance);
  }}
  className="bg-purple-500 text-white px-3 py-1 rounded ml-2"
>
  Speak Scores
</button>



      <PlayerForm players={players} setPlayers={setPlayers} />

      <ScoreTable players={players} setPlayers={setPlayers} targetScore={targetScore} />

      <ScoreChart players={players} />
      
      
      <SettlementTable players={players} targetScore={targetScore} pointValue={1} />
    </div>
  );
}
