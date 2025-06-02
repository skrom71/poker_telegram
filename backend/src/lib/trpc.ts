import { initTRPC, type inferAsyncReturnType } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { type Express } from 'express'
import { IncomingMessage } from 'http'
import superjson from 'superjson'
import { WebSocketServer } from 'ws'
import { type TrpcRouter } from '../router'
import { ExpressRequest } from '../utils/types'
import { type AppContext } from './ctx'

export const getTrpcContext = ({ appContext, req }: { appContext: AppContext; req: ExpressRequest }) => ({
  ...appContext,
  me: req.user || null,
})

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) =>
    getTrpcContext({ appContext, req: req as ExpressRequest })

const getCreateTrpcWsContext =
  (appContext: AppContext) =>
  ({ req }: { req: IncomingMessage }) =>
    getTrpcContext({ appContext, req: req as ExpressRequest })

type TrpcContext = inferAsyncReturnType<ReturnType<typeof getCreateTrpcContext>>

export const trpc = initTRPC.context<TrpcContext>().create({ transformer: superjson })

export const applyTrpcToExpressApp = async (expressApp: Express, appContext: AppContext, trpcRouter: TrpcRouter) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  )

  const wss = new WebSocketServer({
    host: 'localhost',
    port: 3001,
  })

  let createContext = getCreateTrpcWsContext(appContext)
  const handler = applyWSSHandler({ wss, router: trpcRouter, createContext })

  wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`)
    ws.once('close', () => {
      console.log(`➖➖ Connection (${wss.clients.size})`)
    })
  })
  console.log('✅ WebSocket Server listening on ws://localhost:3001')

  process.on('SIGTERM', () => {
    console.log('SIGTERM')
    handler.broadcastReconnectNotification()
    wss.close()
  })
}

export const createTrpcRouter = trpc.router
