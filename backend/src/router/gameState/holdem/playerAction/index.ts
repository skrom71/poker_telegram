import { holdemManager } from '../../../../holdem/manager/HoldemManager'
import { trpc } from '../../../../lib/trpc'
import { zPlayerActionTrpcInput } from './input'

export const playerActionTrpcRoute = trpc.procedure.input(zPlayerActionTrpcInput).mutation(async ({ input }) => {
  await holdemManager.handlePlayerAction(input.tableId, input.playerAction)
  return { success: true }
})
