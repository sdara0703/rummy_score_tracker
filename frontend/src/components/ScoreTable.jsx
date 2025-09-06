import React from "react";

export default function ScoreTable({ players, setPlayers, targetScore }) {
  // Update score manually
  const handleScoreChange = (playerIndex, roundIndex, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].scores[roundIndex] = Number(value) || 0;
    updatedPlayers[playerIndex].totalScore = updatedPlayers[playerIndex].scores.reduce(
      (a, b) => a + b,
      0
    );
    setPlayers(updatedPlayers);
  };

  // Handle fold checkbox
  const handleFoldChange = (playerIndex, roundIndex, checked) => {
    const updatedPlayers = [...players];

    if (checked) {
      updatedPlayers[playerIndex].scores[roundIndex] = 20;
    } else {
      updatedPlayers[playerIndex].scores[roundIndex] = 0;
    }

    updatedPlayers[playerIndex].totalScore = updatedPlayers[playerIndex].scores.reduce(
      (a, b) => a + b,
      0
    );
    setPlayers(updatedPlayers);
  };

  // Disable fold if last 2 rounds were folds
  const isFoldDisabled = (player, roundIndex) => {
    if (roundIndex < 2) return false;
    const prev1 = player.scores[roundIndex - 1] === 20;
    const prev2 = player.scores[roundIndex - 2] === 20;
    return prev1 && prev2;
  };

  const maxRounds = Math.max(...players.map((p) => p.scores.length), 0);

  const addRound = () => {
    const updatedPlayers = players.map((p) => ({
      ...p,
      scores: [...p.scores, 0],
    }));
    setPlayers(updatedPlayers);
  };

  if (players.length === 0) return null;

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
                <div className="flex items-center justify-between">
                  <span>Round {roundIndex + 1}</span>
                  <span>Fold</span>
                </div>
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
                  <div className="flex items-center justify-between gap-2">
                    {/* Score input */}
                    <input
                      type="number"
                      min="0"
                      value={player.scores[roundIndex] || 0}
                      onChange={(e) =>
                        handleScoreChange(playerIndex, roundIndex, e.target.value)
                      }
                      className="w-16 text-center border rounded"
                      disabled={player.scores[roundIndex] === 20} // disable manual input if folded
                    />

                    {/* Fold checkbox */}
                    <label className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={player.scores[roundIndex] === 20}
                        disabled={isFoldDisabled(player, roundIndex)}
                        onChange={(e) =>
                          handleFoldChange(playerIndex, roundIndex, e.target.checked)
                        }
                      />
                    </label>
                  </div>
                </td>
              ))}
              <td className="border border-gray-300 px-2 py-1">{player.totalScore}</td>
              <td className="border border-gray-300 px-2 py-1">
                {player.totalScore >= targetScore ? (
                  <span className="text-red-600 font-bold">REACHED!</span>
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
