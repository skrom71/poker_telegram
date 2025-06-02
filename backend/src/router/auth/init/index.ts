import { parse, validate } from '@telegram-apps/init-data-node'
import { env } from '../../../lib/env'
import { trpc } from '../../../lib/trpc'
import { createAccount, getAccountById } from '../../../mongodb/account/AcoountRepository'
import { signJWT } from '../../../utils/signJWT'
import { zInitTrpcInput } from './input'

export const initTrpcRoute = trpc.procedure.input(zInitTrpcInput).query(async ({ ctx, input }) => {
  validate(input.tma, env.TELEGRAM_BOT_TOKEN, {
    expiresIn: 86400,
  })

  const userData = parse(input.tma)
  const telg_id = userData.user?.id.toString()
  const name = userData.user?.first_name
  const username = userData.user?.username

  if (!telg_id) {
    throw new Error('User not found')
  }

  const account = await getAccountById(telg_id)

  if (!account) {
    createAccount(telg_id, name ?? '', username ?? '')
  }
  const token = signJWT(telg_id)
  return { token, userId: telg_id }
})
