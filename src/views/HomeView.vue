<script setup lang="ts">
import axios from 'axios'
import { axiosHttpRequest } from '../utils/api'
import Balance from '../components/global/Balance.vue'
import AddTransaction from '../components/global/AddTransaction.vue'
import MainWrap from '../components/global/MainWrap.vue'
import NewArticle from '../components/news/Article.vue'

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
      <h1 class="text-2xl font-bold">Welcome User</h1>
      <Balance class="text-lg" balance="123123">Total Balance</Balance>
      <AddTransaction />
    </header>
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
      <div class="col-span-2">
        <NewArticle />
        <div class="bg-terciary rounded-lg p-4 flex flex-col space-y-2">
          <h2 class="text-lg font-semibold">News</h2>
          <div class="bg-gray-700 p-2 rounded"></div>
          <div class="bg-gray-700 p-2 rounded">Noticia 2</div>
        </div>
      </div>
    </MainWrap>
  </div>
</template>
