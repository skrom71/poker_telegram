import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnGameStateTrpcInput = z.object({
  tableId: zStringRequired,
  userId: zStringRequired,
})
