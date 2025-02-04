// USING FETCH

export const fetchCoinGeckoData = async (method: string, endpoint: string) => {
  const baseUrl = import.meta.env.VITE_COINGECKO_BASE_URL
  const apiKey = import.meta.env.VITE_COINGECKO_API_KEY

  const url = `${baseUrl}${endpoint}`

  const options = {
    method: method,
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': apiKey,
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) throw new Error('Error fetch data')
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}
