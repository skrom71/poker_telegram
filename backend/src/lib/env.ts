import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const zEnv = z.object({
  PORT: z.string().trim().min(1),
  HOST_ENV: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  MONGO_URI: z.string().trim().min(1),
  TELEGRAM_BOT_TOKEN: z.string().trim().min(1),
})

// eslint-disable-next-line node/no-process-env
export const env = zEnv.parse(process.env)
