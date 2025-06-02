import { zStringRequired } from '@pokertrust/shared'
import { z } from 'zod'
import { trpc } from '../../../lib/trpc'
import { getAccountById } from '../../../mongodb/account/AcoountRepository'

export const getMeLocalTrpcRoute = trpc.procedure
  .input(
    z.object({
      userId: zStringRequired,
    })
  )
  .query(async ({ ctx, input }) => {
    let account = await getAccountById(input.userId)

    if (!account) {
      throw Error('User not found')
    }
    // ctx.me = account
    return { me: account }
  })
