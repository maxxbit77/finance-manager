import axios from 'axios'
import { log } from 'console'

export const fetchCoinMarketCapData = async () => {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'

  const headers = {
    'X-CMC_PRO_API_KEY': '98a1480d-bd6d-4124-81df-9bc947c847a7',
  }

  try {
    const response = await axios.get(url, { headers })
    console.log('response.data', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('Error al obtener datos de CoinMarketCap:', error)
    return []
  }
}
