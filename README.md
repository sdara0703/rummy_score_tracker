# Rummy Tracker Instructions



A web app to track multi-round Rummy scores, calculate fair payouts, and display settlements.

## Features

- Add players dynamically
- Enter scores per round
- Show running totals
- Display score graph
- Calculate fair payouts ($0.50 rounding)
- Show final settlements for a target score

## Local Setup

1. Clone the repo
2. Install dependencies and run frontend

```bash

curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
cd frontend
nvm instsll 18
nvm use 18
npm run dev -- --port 3000