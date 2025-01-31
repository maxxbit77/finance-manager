<script setup lang="ts">
import { axiosHttpRequest } from '../utils/api'
import CryptoTable from '../components/table/Crypto.vue'
import type { Coin } from '../types/cryptoCoin'
import { onMounted, ref } from 'vue'

interface ApiResponse {
  data: Coin[]
}

const cryptoData = ref<Coin[]>([])

async function fetchData() {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
  const headers = {
    'X-CMC_PRO_API_KEY': '98a1480d-bd6d-4124-81df-9bc947c847a7',
  }

  try {
    const response = await axiosHttpRequest<ApiResponse>(url, 'GET', undefined, headers)

    if (response && response.data) {
      cryptoData.value = response.data // Asigna los datos a `cryptoData`
    }
    console.log('Datos recibidos:', response.data)
  } catch (error) {
    console.error('Error al obtener los datos:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <h1 class="text-3xl">Today's Cryptocurrency Prices by Market Cap</h1>

    <div>
      <!-- Usa `v-if` para verificar si `cryptoData` tiene elementos -->
      <CryptoTable v-if="cryptoData.length > 0" :cryptoData="cryptoData" />
    </div>
  </div>
</template>
