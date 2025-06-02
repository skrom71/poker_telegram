import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnFreeBalanceTrpcInput = z.object({
  userId: zStringRequired,
})
