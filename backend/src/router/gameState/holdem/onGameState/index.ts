import { observable } from '@trpc/server/observable'
import { HoldemGameStateEvents } from '../../../../holdem/events/holdemGameStateEvents'
import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'
import { zOnGameStateTrpcInput } from './input'

export const onGameStateTrpcRoute = trpc.procedure.input(zOnGameStateTrpcInput).subscription(({ input }) => {
  const event = 'onGameState'
  return observable<HoldemGameStateEvents[typeof event]>((emit) => {
    const gameState = holdemManager.gameStateByTableId(input.tableId)

    if (!gameState) {
      throw Error('Game State NOT FOUND')
    }

    emit.next({ gameState: gameState })

    const handler = (data: HoldemGameStateEvents[typeof event]) => {
      emit.next(data)
    }

    const eventManager = holdemManager.eventManagerByTableId(input.tableId)

    if (!eventManager) {
      throw Error('EventManager NOT FOUND')
    }

    eventManager.on(event, handler)

    return () => {
      // eventManager.off(event, handler)
      // if (
      //   holdemManager.gameStateByTableId(input.tableId)?.players.find((player) => player.id === input.userId) !==
      //     undefined ||
      //   holdemManager.gameStateByTableId(input.tableId)?.pendingPlayers.find((player) => player.id === input.userId) !==
      //     undefined
      // ) {
      //   holdemManager.handlePlayerDisconnect(input.tableId, input.userId)
      // }
    }
  })
})
