export function calculateSettlements(players, targetScore=201, pointValue=1){
  const balances = players.map(p=>({name:p.name,balance:(p.totalScore-targetScore)*pointValue}));
  let debtors = balances.filter(b=>b.balance<0).map(b=>({...b}));
  let creditors = balances.filter(b=>b.balance>0).map(b=>({...b}));
  let settlements=[];
  let i=0,j=0;
  while(i<debtors.length && j<creditors.length){
    const debit = -debtors[i].balance;
    const credit = creditors[j].balance;
    const pay = Math.min(debit,credit);
    settlements.push({from:debtors[i].name,to:creditors[j].name,amount:pay});
    debtors[i].balance += pay;
    creditors[j].balance -= pay;
    if(Math.abs(debtors[i].balance)<0.001) i++;
    if(Math.abs(creditors[j].balance)<0.001) j++;
  }
  return settlements;
}
