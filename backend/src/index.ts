import cors from 'cors'
import express from 'express' // Импортируем express
import http from 'http'
import mongoose from 'mongoose'
import { createAppContext } from './lib/ctx'
import { env } from './lib/env'
import { applyPassportToExpressApp } from './lib/passport'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'

const PORT = env.PORT
const LOCAL_IP = 'localhost'

const app = express()
const server = http.createServer(app)

app.use(cors())

mongoose
  .connect(env.MONGO_URI, { dbName: 'poker-trust' })
  .then(async () => {
    console.log('🚀 Connected to MongoDB Atlas')
  })
  .catch((error) => console.error('❌ MongoDB Atlas connection error:', error))

let ctx = createAppContext()
applyPassportToExpressApp(app, ctx)
//env.HOST_ENV === 'production' && applyPassportToExpressApp(app, ctx)
applyTrpcToExpressApp(app, ctx, trpcRouter)

// Запуск сервера
server.listen(PORT, () => {
  console.log(`Server running on http://${LOCAL_IP}:${PORT}`)
})
