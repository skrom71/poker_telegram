import { Hand } from 'pokersolver'

export type CardHolder = {
  id: string
  cards: string[]
}

export function determineWinners(players: CardHolder[], board: string[]): string[] {
  if (board.length !== 5) {
    throw new Error('На борде должно быть ровно 5 карт.')
  }

  const playerHands = players.map((player) => {
    const allCards = player.cards.concat(board)
    return {
      name: player.id,
      hand: Hand.solve(allCards),
    }
  })

  const bestHand = Hand.winners(playerHands.map((p) => p.hand))

  return playerHands.filter((p) => bestHand.includes(p.hand)).map((p) => p.name)
}

export function determineHand(cards: string[]): string {
  return Hand.solve(cards).name
}

// // Пример использования
// const players: Player[] = [
//   { name: "Игрок 1", hand: ["Ah", "Kh"] }, // Пара тузов
//   { name: "Игрок 2", hand: ["Qs", "Js"] }, // Пара дам
//   { name: "Игрок 3", hand: ["2d", "3d"] }, // Слабая комбинация
// ];

// const board: string[] = ["10h", "Jd", "Qh", "Ks", "9c"]; // Борд
// const winners = determineWinner(players, board);
// console.log("Победители:", winners);
