declare module 'pokersolver' {
  export class Hand {
    name: string
    descr: string
    static solve(cards: string[]): Hand
    static winners(hands: Hand[]): Hand[]
  }
}
