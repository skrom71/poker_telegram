import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnPlayerActionTrpcInput = z.object({
  tableId: zStringRequired,
  // userId: zStringRequired,
})
