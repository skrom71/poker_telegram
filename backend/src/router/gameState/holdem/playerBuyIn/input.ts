import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zPlayerBuyInTrpcInput = z.object({
  tableId: zStringRequired,
  player: z.object({
    id: zStringRequired,
    name: zStringRequired,
    stack: z.number(),
    position: z.number(),
  }),
})
