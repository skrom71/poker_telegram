import { type Request } from 'express'

export type ExpressRequest = Request & {
  user: User | undefined
}

export type User = {
  id: string
  name: string
  username: string
  balance: number
  freeBalance: number
  tonAddress: string
}
