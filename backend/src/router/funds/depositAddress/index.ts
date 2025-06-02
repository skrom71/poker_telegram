import { getTONUSDTRate } from '../../../funds/service/CurrencyService'
import { trpc } from '../../../lib/trpc'
import { getAccountById } from '../../../mongodb/account/AcoountRepository'
import { zDepositAddressTrpcInput } from './input'

export const depositAddressTrpcRoute = trpc.procedure.input(zDepositAddressTrpcInput).query(async ({ input }) => {
  const rate = await getTONUSDTRate()
  const account = await getAccountById(input.userId)
  if (/*rate !== undefined &&*/ account !== null) {
    // const tonFee = roundToTwoDecimals(rate.price * transactionManager.tonFee)
    // const minimalTonDeposit = transactionManager.minimalTonDepositUSD
    return {
      address: account.tonAddress,
    }
  }
})

// export type DepositMethod = {
//   id: string
//   name: string
//   minDeposit: number
//   fee: number
//   address: string
// }
