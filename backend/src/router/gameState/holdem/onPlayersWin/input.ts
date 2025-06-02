import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zOnPlayersWinTrpcInput = z.object({
  tableId: zStringRequired,
})
