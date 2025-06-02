import BalanceOp, { IBalanceOp } from './BalanceOpModel'

export async function addBalanceOp(
  userId: string,
  amount: number,
  currentBalance: number,
  previousBalance: number,
  type: 'free' | 'fiat',
  tag: 'deposit' | 'withdraw' | 'buy-in' | 'buy-out'
): Promise<IBalanceOp> {
  return new BalanceOp({
    userId,
    amount,
    currentBalance,
    previousBalance,
    type,
    tag,
  }).save()
}
