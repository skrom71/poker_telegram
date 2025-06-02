import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnBalanceTrpcInput = z.object({
  userId: zStringRequired,
})
