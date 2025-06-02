import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zPlayerActionTrpcInput = z.object({
  tableId: zStringRequired,
  playerAction: z.object({
    userId: zStringRequired,
    action: z.enum(['fold', 'call', 'bet', 'check', 'allIn']),
    betAmount: z.number().optional(),
  }),
})
