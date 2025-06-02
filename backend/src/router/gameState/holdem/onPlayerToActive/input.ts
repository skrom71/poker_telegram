import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnPlayerToActiveTrpcInput = z.object({
  tableId: zStringRequired,
  userId: zStringRequired,
})
