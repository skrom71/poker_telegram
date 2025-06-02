import { observable } from '@trpc/server/observable'
import { HoldemGameStateEvents } from '../../../../holdem/events/holdemGameStateEvents'
import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'
import { zOnPlayerActionTrpcInput } from './input'

export const onPlayerActionTrpcRoute = trpc.procedure.input(zOnPlayerActionTrpcInput).subscription(({ input }) => {
  const event = 'onPlayerAction'
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
