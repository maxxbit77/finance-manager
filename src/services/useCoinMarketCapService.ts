import axios from 'axios'

export const fetchCoinMarketCapData = async (endpoint: string) => {
  const headers = {}
  try {
    const response = await axios.get(`/api/coinmarketcap/v1${endpoint}`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}
