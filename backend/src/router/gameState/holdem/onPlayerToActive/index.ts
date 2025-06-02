import { observable } from '@trpc/server/observable'
import { HoldemGameStateEvents } from '../../../../holdem/events/holdemGameStateEvents'
import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'
import { zOnPlayerToActiveTrpcInput } from './input'

export const onPlayerToActiveTrpcRoute = trpc.procedure.input(zOnPlayerToActiveTrpcInput).subscription(({ input }) => {
  const event = 'onPlayerToActive'
  return observable<HoldemGameStateEvents[typeof event]>((emit) => {
    const gameState = holdemManager.gameStateByTableId(input.tableId)

    if (!gameState) {
      throw Error('onPlayerBackToActive Error')
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
