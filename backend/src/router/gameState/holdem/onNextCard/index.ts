import { observable } from '@trpc/server/observable'
import { HoldemGameStateEvents } from '../../../../holdem/events/holdemGameStateEvents'
import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'
import { zOnNextCardTrpcInput } from './input'

export const onNextCardTrpcRoute = trpc.procedure.input(zOnNextCardTrpcInput).subscription(({ input }) => {
  const event = 'onNextCard'
  return observable<HoldemGameStateEvents[typeof event]>((emit) => {
    const gameState = holdemManager.gameStateByTableId(input.tableId)

    if (!gameState) {
      throw Error('Game State NOT FOUND')
    }

    const handler = (data: HoldemGameStateEvents[typeof event]) => {
      emit.next(data)
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
