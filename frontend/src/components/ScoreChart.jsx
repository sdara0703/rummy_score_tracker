import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function ScoreChart({ players }) {
  if(players.length===0) return null;

  // Prepare data per round
  const maxRounds = Math.max(...players.map(p=>p.scores.length));
  const data = [];
  for(let i=0;i<maxRounds;i++){
    const row = { round: i+1 };
    players.forEach(p => row[p.name] = p.scores[i] || 0);
    data.push(row);
  }

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">Score Graph</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="round" />
        <YAxis />
        <Tooltip />
        <Legend />
        {players.map((p,i)=>(
          <Line key={i} type="monotone" dataKey={p.name} stroke={`hsl(${i*50},70%,50%)`} />
        ))}
      </LineChart>
    </div>
  )
}
