import axios from 'axios'

export const fetchCoinGeckoData = async (method: string, endpoint: string) => {
  const baseUrl = import.meta.env.VITE_COINGECKO_BASE_URL
  const apiKey = import.meta.env.VITE_COINGECKO_API_KEY

  try {
    const response = await axios({
      method,
      url: `${baseUrl}${endpoint}`,
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': apiKey,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}
