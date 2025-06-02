import axios from 'axios'

export type BinanceTONUSDT = {
  symbol: string
  price: number
}

export async function getTONUSDTRate(): Promise<BinanceTONUSDT | undefined> {
  const _tonUSDTURL = 'https://api.binance.com/api/v3/ticker/price?symbol=TONUSDT'

  try {
    const response = await (await axios.get<{ symbol: string; price: string }>(_tonUSDTURL)).data
    return { symbol: response.symbol, price: Number(response.price) }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
