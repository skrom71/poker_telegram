import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zPlayerLeaveTrpcInput = z.object({
  tableId: zStringRequired,
  userId: zStringRequired,
})
