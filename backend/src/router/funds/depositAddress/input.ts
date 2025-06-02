import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'

export const zDepositAddressTrpcInput = z.object({ userId: zStringRequired })
