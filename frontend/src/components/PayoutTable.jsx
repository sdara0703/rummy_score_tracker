export default function PayoutTable({ players }) {
  if(players.length === 0) return null;

  // Calculate proportional payouts
  const sorted = [...players].sort((a,b) => b.totalScore - a.totalScore);
  const n = players.length;
  const totalBet = 5;

  let payouts = {};
  sorted.forEach(p => payouts[p.name] = 0);
  for(let i=0;i<n-1;i++){
    for(let j=i+1;j<n;j++){
      const diff = (sorted[i].totalScore - sorted[j].totalScore)/100*totalBet;
      payouts[sorted[i].name] += diff;
      payouts[sorted[j].name] -= diff;
    }
  }

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">Payouts</h2>
      <table className="border w-full">
        <thead>
          <tr>
            <th className="border px-2">Player</th>
            <th className="border px-2">Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p,i)=>(
            <tr key={i}>
              <td className="border px-2">{p.name}</td>
              <td className="border px-2">{payouts[p.name].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
