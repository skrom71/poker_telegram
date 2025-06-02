import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnNotEnoughPlayersTrpcInput = z.object({
  tableId: zStringRequired,
})
