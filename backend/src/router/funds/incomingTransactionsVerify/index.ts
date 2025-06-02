import { Address } from '@ton/core'
import { tonWalletService } from '../../../funds/service/TONWalletService'
import { trpc } from '../../../lib/trpc'
import { getAccountById } from '../../../mongodb/account/AcoountRepository'
import { zTransactionsVerifyTrpcInput } from './input'

export const incomingTransactionsVerifyTrpcRoute = trpc.procedure
  .input(zTransactionsVerifyTrpcInput)
  .query(async ({ input }) => {
    const account = await getAccountById(input.userId)

    if (account !== null) {
      tonWalletService.withdrawTonCheck(
        account.id,
        account.tonMnemonic,
        Address.parse('0QBdisEepJzePXB8qoKCRAYn6gAs5iaPh_3FAnrO0_vXoi_e')
      )
      return { sucess: true }
    }
    return { sucess: false }
  })
