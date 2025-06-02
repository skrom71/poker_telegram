import { WebAppProvider } from '@vkruglikov/react-telegram-web-app'
import { useEffect } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import AppRoutes from './lib/routers'
import { TrpcProvider } from './lib/trpc'
import './styles/global.css'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate() // Хук для навигации

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const startAppData = queryParams.get('tgWebAppStartParam') // Получаем параметр tgWebAppStartParam из URL

    if (startAppData === 'deposit') {
      // Перенаправляем на экран депозита
      navigate('/table/27b73d25-3a7d-4b8d-9696-785f6af6d304')
    }
  }, [location, navigate])

  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <TrpcProvider>
        <ParallaxProvider>
          <AppRoutes />
        </ParallaxProvider>
      </TrpcProvider>
    </WebAppProvider>
  )
}

// Корневой компонент, обернутый в BrowserRouter
export function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
