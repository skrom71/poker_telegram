import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { HoldemGameStatePlayer } from '../../../../holdem/session/HoldemGameState'
import { trpc } from '../../../../lib/trpc'
import { zPlayerBuyInTrpcInput } from './input'

export const playerBuyInTrpcRoute = trpc.procedure.input(zPlayerBuyInTrpcInput).mutation(({ input }) => {
  const player: HoldemGameStatePlayer = {
    id: input.player.id,
    name: input.player.name,
    stack: input.player.stack,
    bet: 0,
    total: 0,
    status: 'default',
    position: input.player.position,
    cards: [],
    hand: '',
  }

  holdemManager.handlePlayerBuyIn(input.tableId, player)
  return { success: true }
})
