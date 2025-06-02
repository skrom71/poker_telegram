import { addBalanceOp } from '@/mongodb/funds/balance/BalanceOpRepo'
import { roundToTwoDecimals } from '@pokertrust/shared'
import { EventManager } from '../../lib/eventManager'
import {
  getAccountById,
  updateAccountBalanceById,
  updateAccountFreeBalanceById,
} from '../../mongodb/account/AcoountRepository'
import { BalanceEvents } from '../events/balanceEvents'

export class BalanceManager {
  public readonly eventManager = new EventManager<BalanceEvents>()

  private _eventFreeBalance = 'onFreeBalance' as const
  private _eventBalance = 'onBalance' as const

  async withdrawFree(
    userId: string,
    amount: number,
    tag: 'deposit' | 'withdraw' | 'buy-in' | 'buy-out'
  ): Promise<number> {
    const user = await getAccountById(userId)
    if (!user) {
      throw Error('User not found')
    }
    if (user.freeBalance < amount) {
      throw Error('Free Balance is not enough')
    }
    const newUser = await updateAccountFreeBalanceById(userId, roundToTwoDecimals(-amount))
    if (!newUser) {
      throw Error('Update user error')
    }

    const previousBalance = user.balance
    await addBalanceOp(userId, amount, newUser.balance, previousBalance, 'free', tag)

    this.eventManager.emit(this._eventFreeBalance, { amount: newUser.freeBalance })

    return newUser.freeBalance
  }

  async depositFree(
    userId: string,
    amount: number,
    tag: 'deposit' | 'withdraw' | 'buy-in' | 'buy-out'
  ): Promise<number> {
    const user = await getAccountById(userId)
    if (!user) {
      throw Error('User not found')
    }
    const newUser = await updateAccountFreeBalanceById(userId, roundToTwoDecimals(amount))
    if (!newUser) {
      throw Error('Update user error')
    }

    const previousBalance = user.balance
    await addBalanceOp(userId, amount, newUser.balance, previousBalance, 'free', tag)

    this.eventManager.emit(this._eventFreeBalance, { amount: newUser.freeBalance })

    return newUser.freeBalance
  }

  async withdraw(userId: string, amount: number, tag: 'deposit' | 'withdraw' | 'buy-in' | 'buy-out'): Promise<number> {
    const user = await getAccountById(userId)
    if (!user) {
      throw Error('User not found')
    }

    if (user.balance < amount) {
      throw Error('Balance is not enough')
    }
    const newUser = await updateAccountBalanceById(userId, roundToTwoDecimals(-amount))
    if (!newUser) {
      throw Error('Update user error')
    }

    const previousBalance = user.balance
    await addBalanceOp(userId, amount, newUser.balance, previousBalance, 'fiat', tag)

    this.eventManager.emit(this._eventBalance, { amount: newUser.balance })

    return newUser.balance
  }

  async deposit(userId: string, amount: number, tag: 'deposit' | 'withdraw' | 'buy-in' | 'buy-out'): Promise<number> {
    const user = await getAccountById(userId)
    if (!user) {
      throw Error('User not found')
    }

    const newUser = await updateAccountBalanceById(userId, roundToTwoDecimals(amount))

    if (!newUser) {
      throw Error('Update user error')
    }

    const previousBalance = user.balance
    await addBalanceOp(userId, amount, newUser.balance, previousBalance, 'fiat', tag)

    this.eventManager.emit(this._eventBalance, { amount: newUser.balance })

    return newUser.balance
  }
}

export const balanceManager = new BalanceManager()
