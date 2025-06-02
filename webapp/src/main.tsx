import { init } from '@telegram-apps/sdk-react'
import eruda from 'eruda'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Root } from './App.tsx'
try {
  eruda.init()
  init()
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>
  )
} catch (error) {
  console.info(error)
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Root />
    </StrictMode>
  )
}
