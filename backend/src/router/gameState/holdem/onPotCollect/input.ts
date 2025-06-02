import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnPotCollectTrpcInput = z.object({
  tableId: zStringRequired,
  // userId: zStringRequired,
})
