import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnNextStageTrpcInput = z.object({
  tableId: zStringRequired,
  userId: zStringRequired,
})
