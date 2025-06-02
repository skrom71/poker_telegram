import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnNewRoundTrpcInput = z.object({
  tableId: zStringRequired,
  userId: zStringRequired,
})
