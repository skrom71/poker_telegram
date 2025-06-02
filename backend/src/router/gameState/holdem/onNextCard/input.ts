import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnNextCardTrpcInput = z.object({
  tableId: zStringRequired,
})
