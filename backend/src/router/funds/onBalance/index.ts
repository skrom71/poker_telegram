import { roundToTwoDecimals } from '@pokertrust/shared'
import { observable } from '@trpc/server/observable'
import { BalanceEvents } from '../../../funds/events/balanceEvents'
import { balanceManager } from '../../../funds/manager/BalanceManager'
import { trpc } from '../../../lib/trpc'
import { getAccountById } from '../../../mongodb/account/AcoountRepository'
import { zOnBalanceTrpcInput } from './input'

export const onBalanceTrpcRoute = trpc.procedure.input(zOnBalanceTrpcInput).subscription(({ input }) => {
  async function getBalance(userId: string): Promise<number> {
    const user = await getAccountById(userId)

    if (!user) {
      throw Error('User not found')
    }

    return roundToTwoDecimals(user?.balance)
  }

  const event = 'onBalance'
  return observable<BalanceEvents[typeof event]>((emit) => {
    const balance = getBalance(input.userId)
      .then((value) => {
        emit.next({ amount: value })
      })
      .catch((error) => {
        throw Error(`Error balance ${error}`)
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
