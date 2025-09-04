import React from "react";

export default function ScoreTable({ players, setPlayers, targetScore }) {
  const handleScoreChange = (playerIndex, roundIndex, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].scores[roundIndex] = Number(value) || 0;
    updatedPlayers[playerIndex].totalScore = updatedPlayers[playerIndex].scores.reduce(
      (a, b) => a + b,
      0
    );
    setPlayers(updatedPlayers);
  };

  const maxRounds = Math.max(...players.map((p) => p.scores.length), 0);

  const addRound = () => {
    const updatedPlayers = players.map((p) => ({
      ...p,
      scores: [...p.scores, 0],
    }));
    setPlayers(updatedPlayers);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Scores</h2>
        <button
          onClick={addRound}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
        >
          + Add Round
        </button>
      </div>

      <table className="table-auto border-collapse border border-gray-400 w-full text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-1">Player</th>
            {Array.from({ length: maxRounds }).map((_, roundIndex) => (
              <th key={roundIndex} className="border border-gray-300 px-2 py-1">
                Round {roundIndex + 1}
              </th>
            ))}
            <th className="border border-gray-300 px-2 py-1">Total</th>
            <th className="border border-gray-300 px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, playerIndex) => (
            <tr key={playerIndex}>
              <td className="border border-gray-300 px-2 py-1">{player.name}</td>
              {Array.from({ length: maxRounds }).map((_, roundIndex) => (
                <td key={roundIndex} className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    min="0"
                    value={player.scores[roundIndex] || 0}
                    onChange={(e) =>
                      handleScoreChange(playerIndex, roundIndex, e.target.value)
                    }
                    className="w-16 text-center border rounded"
                  />
                </td>
              ))}
              <td className="border border-gray-300 px-2 py-1">{player.totalScore}</td>
              <td className="border border-gray-300 px-2 py-1">
                {player.totalScore >= targetScore ? (
                  <span className="text-red-600 font-bold">OUT!</span>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
