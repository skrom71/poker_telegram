// export type Pot = {
//   amount: number
//   eligiblePlayers: string[]
// }

import { Pot } from '../holdem/session/HoldemGameState'

export type PlayerTotal = {
  playerId: string
  amount: number
}

export default function calculatePots(totals: PlayerTotal[], pots: Pot[] = []): Pot[] {
  const activePlayers = totals
    .map((item, index) => ({
      index,
      playerId: item.playerId,
      amount: item.amount,
    }))
    .filter((item) => item.amount > 0)

  if (activePlayers.length < 2) return pots

  const minContribution = Math.min(...activePlayers.map((item) => item.amount))
  const potAmount = minContribution * activePlayers.length
  const eligibleIds = activePlayers.map((item) => item.playerId)
  pots.push({ amount: potAmount, eligibleIds })

  for (const item of activePlayers) {
    totals[item.index].amount -= minContribution
  }

  return calculatePots(totals, pots)
}

// const contribution1 = { playerId: "A", amount: 342 };
// const contribution2 = { playerId: "B", amount: 500 };
// const contribution3 = { playerId: "C", amount: 120 };
// const contribution4 = { playerId: "D", amount: 605 };

// const pots = calculatePots([
//   contribution1,
//   contribution2,
//   contribution3,
//   contribution4,
// ]);
// console.log(pots);
