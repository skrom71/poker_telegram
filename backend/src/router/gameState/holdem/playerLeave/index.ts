import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'
import { zPlayerLeaveTrpcInput } from './input'

export const playerLeaveTrpcRoute = trpc.procedure.input(zPlayerLeaveTrpcInput).mutation(async ({ input }) => {
  await holdemManager.handlePlayerLeave(input.tableId, input.userId)
  return { success: true }
})
