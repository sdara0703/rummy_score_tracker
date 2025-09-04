export function calculateFairPayouts(players, bet=5, r=0.8){
  const n = players.length;
  if(n<2) return {};
  const sorted = [...players].sort((a,b)=>b.totalScore-a.totalScore);
  const totalPot = n*bet;
  const lastBet = bet;
  const winnersCount = n-1;
  const remainingPot = totalPot - lastBet;
  const geomSum = (1 - r**winnersCount)/(1-r);
  let P1 = remainingPot / geomSum;
  let payouts = {};
  for(let i=0;i<winnersCount;i++) payouts[sorted[i].name] = P1*r**i;
  payouts[sorted[n-1].name]=0;
  for(let i=1;i<winnersCount;i++) payouts[sorted[i].name] = Math.round(payouts[sorted[i].name]*2)/2;
  const sumOther = Object.values(payouts).slice(1).reduce((a,b)=>a+b,0);
  payouts[sorted[0].name] = totalPot - sumOther - 0;
  return payouts;
}
