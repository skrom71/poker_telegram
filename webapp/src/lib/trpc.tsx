import type { TrpcRouter } from '@pokertrust/backend/src/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import { env } from './env'

export const trpc = createTRPCReact<TrpcRouter>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const wsClient = createWSClient({
  url: env.VITE_HOST_ENV === 'local' ? 'ws://localhost:3001' : `wss://${window.location.host}/trpc/ws/`,
})

const link = splitLink({
  condition: (op) => op.type === 'subscription',
  true: wsLink({ client: wsClient }),
  false: httpBatchLink({
    url: env.VITE_HOST_ENV === 'local' ? env.VITE_BACKEND_TRPC_URL : `https://${window.location.host}/trpc/`,
    headers: () => {
      const token = localStorage.getItem('token')
      return token ? { authorization: `Bearer ${token}` } : {}
    },
  }),
})

// Создаем tRPC клиент
const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [link], // Используем разделенный линк
})

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
