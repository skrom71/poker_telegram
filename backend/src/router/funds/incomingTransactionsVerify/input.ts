import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zTransactionsVerifyTrpcInput = z.object({ userId: zStringRequired })
