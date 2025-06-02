import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zInitLocalTrpcInput = z.object({
  playerId: zStringRequired,
})
