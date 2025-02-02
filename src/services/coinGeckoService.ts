export const fetchCoinGeckoData = async () => {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100'

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-3m53E95s4AgeaXPf5Th4WC9p',
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) throw new Error('Error al obtener datos de CoinGecko')
    return await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}
