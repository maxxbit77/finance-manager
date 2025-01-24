import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * Realiza una llamada HTTP con Axios
 * @param url - URL a la que se realizará la solicitud
 * @param method - Método HTTP (GET, POST, PUT, DELETE, etc.)
 * @param data - Datos a enviar en el cuerpo de la solicitud (para POST, PUT, etc.)
 * @param headers - Cabeceras personalizadas opcionales
 * @returns Respuesta de la API o error
 */
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
    console.error('Error en la llamada Axios:', error.message)
    throw error.response?.data || error.message
  }
}
