// USING AXIOS

import axios from 'axios'

export const fetchCoinMarketCapData = async (method: string, endpoint: string) => {
  const baseUrl = import.meta.env.VITE_COINMARKETCAP_BASE_URL
  const apiKey = import.meta.env.VITE_COINMARKETCAP_API_KEY

  const url = `${baseUrl}${endpoint}`
  const headers = {
    'X-CMC_PRO_API_KEY': apiKey,
  }

  try {
    const response = await axios.get(url, { headers })
    return response.data.data
  } catch (error) {
    console.error('Error fetch data:', error)
    return []
  }
}
