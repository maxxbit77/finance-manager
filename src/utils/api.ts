import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export async function axiosHttpRequest<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  data?: any,
  headers?: Record<string, string>,
): Promise<T> {
  const config: AxiosRequestConfig = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    data,
  }

  try {
    const response: AxiosResponse<T> = await axios(config)
    return response.data
  } catch (error: any) {
    console.error('Fetch error:', error.message)
    throw error.response?.data || error.message
  }
}
