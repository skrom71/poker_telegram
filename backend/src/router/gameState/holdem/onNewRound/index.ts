import { observable } from '@trpc/server/observable'
import { HoldemGameStateEvents } from '../../../../holdem/events/holdemGameStateEvents'
import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'
import { zOnNewRoundTrpcInput } from './input'

export const onNewRoundTrpcRoute = trpc.procedure.input(zOnNewRoundTrpcInput).subscription(({ input }) => {
  const event = 'onNewRound'
  return observable<HoldemGameStateEvents[typeof event]>((emit) => {
    const gameState = holdemManager.gameStateByTableId(input.tableId, true)

    if (!gameState) {
      throw Error('Game State NOT FOUND')
    }

    if (gameState.players.find((p) => p.id === input.userId)?.cards?.length === 2) {
      emit.next({ userId: input.userId, cards: gameState.players.find((p) => p.id === input.userId)?.cards ?? [] })
    }

    const handler = (data: HoldemGameStateEvents[typeof event]) => {
      if (input.userId === data.userId) {
        emit.next(data)
      }
    }

    const eventManager = holdemManager.eventManagerByTableId(input.tableId)

    if (!eventManager) {
      throw Error('EventManager NOT FOUND')
    }

    eventManager.on(event, handler)

    return () => {
      eventManager.off(event, handler)
    }
  })
})
