import { observable } from '@trpc/server/observable'
import { HoldemTableListEvents } from '../../../../holdem/events/holdemTableListEvents'
import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'

export const onHoldemTableListTrpcRoute = trpc.procedure.subscription(() => {
  const event = 'onTableList'
  return observable<HoldemTableListEvents[typeof event]>((emit) => {
    emit.next({ list: holdemManager.holdemTableList })

    const handler = (data: HoldemTableListEvents[typeof event]) => {
      emit.next(data)
    }

    holdemManager.eventManager.on(event, handler)
    return () => {
      holdemManager.eventManager.off(event, handler)
    }
  })
})
