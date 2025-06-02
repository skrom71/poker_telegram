import { observable } from '@trpc/server/observable'
import { HoldemGameStateEvents } from '../../../../holdem/events/holdemGameStateEvents'
import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'
import { zOnCountdownTimerTrpcInput } from './input'

export const onTimeToMoveTrpcRoute = trpc.procedure.input(zOnCountdownTimerTrpcInput).subscription(({ input }) => {
  const event = 'onTimeToMove'
  return observable<HoldemGameStateEvents[typeof event]>((emit) => {
    const gameState = holdemManager.gameStateByTableId(input.tableId)

    if (!gameState) {
      throw Error('CountdownTimer error')
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
