import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnCountdownTimerTrpcInput = z.object({
  tableId: zStringRequired,
})
