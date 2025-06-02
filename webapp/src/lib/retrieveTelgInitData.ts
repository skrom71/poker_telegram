import { retrieveRawInitData } from '@telegram-apps/sdk-react'

const retrieveTelgInitData = (): string | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tg = (window as any).Telegram?.WebApp
  if (!tg) {
    return retrieveRawInitData()
  }
  return tg.initData as string
}

export { retrieveTelgInitData }
