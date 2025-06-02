import { observable } from '@trpc/server/observable'
import { BalanceEvents } from '../../../funds/events/balanceEvents'
import { balanceManager } from '../../../funds/manager/BalanceManager'
import { trpc } from '../../../lib/trpc'
import { getAccountById } from '../../../mongodb/account/AcoountRepository'
import { zOnFreeBalanceTrpcInput } from './input'

export const onFreeBalanceTrpcRoute = trpc.procedure.input(zOnFreeBalanceTrpcInput).subscription(({ input }) => {
  async function getFreeBalance(userId: string): Promise<number> {
    const user = await getAccountById(userId)

    if (!user) {
      throw Error('User not found')
    }

    return user?.freeBalance
  }

  const event = 'onFreeBalance'

  return observable<BalanceEvents[typeof event]>((emit) => {
    const balance = getFreeBalance(input.userId)
      .then((value) => {
        emit.next({ amount: value })
      })
      .catch((error) => {
        throw Error(`Error free balance ${error}`)
      })

    const handler = (data: BalanceEvents[typeof event]) => {
      emit.next(data)
    }

    const eventManager = balanceManager.eventManager

    if (!eventManager) {
      throw Error('EventManager NOT FOUND')
    }

    eventManager.on(event, handler)

    return () => {
      eventManager.off(event, handler)
    }
  })
})
