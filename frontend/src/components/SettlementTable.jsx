import { calculateSettlements } from "../utils/settlements";

export default function SettlementTable({ players, targetScore=201, pointValue=1 }) {
  if(players.length === 0) return null;

  const settlements = calculateSettlements(players, targetScore, pointValue);

  if(settlements.length === 0) return <p className="mb-4">No settlements required</p>;

  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">Final Settlements</h2>
      <table className="border w-full">
        <thead>
          <tr>
            <th className="border px-2">From</th>
            <th className="border px-2">To</th>
            <th className="border px-2">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {settlements.map((s,i)=>(
            <tr key={i}>
              <td className="border px-2">{s.from}</td>
              <td className="border px-2">{s.to}</td>
              <td className="border px-2">{s.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
