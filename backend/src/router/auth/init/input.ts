import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zInitTrpcInput = z.object({
  tma: zStringRequired,
})
