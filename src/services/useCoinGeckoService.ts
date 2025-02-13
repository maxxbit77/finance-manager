import axios from 'axios'

const baseUrl = import.meta.env.VITE_COINGECKO_BASE_URL
const apiKey = import.meta.env.VITE_COINGECKO_API_KEY

export const getCoinList = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${baseUrl}${'/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100'}`,
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

export const getCoinChartById = async (id: string) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${baseUrl}/coins/${id}/market_chart?vs_currency=usd&days=20&interval=daily&precision=2`,
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
