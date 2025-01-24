<script setup lang="ts">
import axios from 'axios'
import { axiosHttpRequest } from '../utils/api'
import Balance from '../components/global/Balance.vue'
import AddTransaction from '../components/global/AddTransaction.vue'
import MainWrap from '../components/global/MainWrap.vue'
import NewsArticle from '../components/news/Article.vue'

// async function fetchData() {
//   const url = 'https://sandbox-api.coinmarketcap.com/v1/content/posts/top'
//   const headers = {
//     'X-CMC_PRO_API_KEY': '98a1480d-bd6d-4124-81df-9bc947c847a7',
//   }

//   try {
//     const response = await axiosHttpRequest(url, 'GET', undefined, headers)
//     console.log('Datos recibidos:', response)
//   } catch (error) {
//     console.error('Error al obtener los datos:', error)
//   }
// }
</script>

<template>
  <div class="w-full">
    <header class="flex justify-between items-center mt-6">
      <h1 class="text-4xl font-bold">Welcome User</h1>
      <Balance class="text-lg" balance="123123">Total Balance</Balance>
      <AddTransaction />
    </header>
    <div class="flex justify-between mt-14 mb-2">
      <h3 class="text-end font-bold text-4xl text-secondary">Markets</h3>
      <h3 class="text-end font-bold text-4xl text-secondary">Latest News</h3>
    </div>
    <MainWrap>
      <div class="flex flex-col gap-y-3">
        <div class="col-span-1 bg-terciary rounded-lg p-4 h-48">
          <h2 class="text-lg font-semibold">Savings</h2>
        </div>

        <div class="col-span-2 bg-terciary rounded-lg p-4 h-48">
          <h2 class="text-lg font-semibold">Widget Invest</h2>
        </div>

        <div class="col-span-2 bg-terciary rounded-lg p-4 h-48">
          <h2 class="text-lg font-semibold">Widget Crypto</h2>
        </div>
      </div>
      <div class="col-span-2 overflow-y-auto max-h-dvh">
        <NewsArticle />
      </div>
    </MainWrap>
  </div>
</template>
