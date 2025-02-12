<script setup lang="ts">
import { ref, onMounted, computed, shallowRef } from 'vue'
import { useCryptoStore } from '@/stores/cryptos'
import CryptoTable from '@/components/crypto/Table.vue'
import RectanglesMap from '@/components/crypto/RectanglesMap.vue'
import { fetchCoinGeckoData } from '@/services/useCoinGeckoService'
import Spinner from '@/components/global/Spinner.vue'
import ProgressBar from '@/components/global/ProgressBar.vue'
import type { Coin } from '@/types/cryptoCoin'

const cryptoStore = useCryptoStore()
const activeTab = ref('rectangle')
const cryptoData = ref<Coin[]>([])

const tabs = shallowRef([
  { name: 'Hot Map', value: 'rectangle', component: RectanglesMap },
  { name: 'Market Cap', value: 'list', component: CryptoTable },
])

const activeComponent = computed(() => {
  const tab = tabs.value.find((t) => t.value === activeTab.value)
  return tab ? tab.component : null
})

const setCoinData = async () => {
  const data = await fetchCoinGeckoData(
    'GET',
    '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100',
  )
  cryptoData.value = data
  cryptoStore.setCryptoList(data)
}

const handleProgressBarCompleted = async () => {
  console.log('completed')
  setCoinData()
}

onMounted(async () => {
  if (cryptoStore.cryptos.length > 0) {
    cryptoData.value = cryptoStore.cryptos
  } else {
    setCoinData()
  }
})
</script>

<template>
  <div class="relative">
    <div class="h-4">
      <ProgressBar @completed="handleProgressBarCompleted" />
    </div>
    <h1 class="text-3xl mt-12 mb-24">Today's Cryptocurrency Prices by Market Cap</h1>

    <div class="z-10 relative" v-if="cryptoData.length > 0">
      <component :is="activeComponent" v-if="activeComponent" :cryptoData="cryptoData" />
    </div>
    <div v-else class="flex justify-center items-center my-auto">
      <p class="text-cyan-500 text-5xl">Loading</p>
      <Spinner class="w-16" />
    </div>

    <div class="flex ml-1.5 absolute top-40 -left-1.5 w-full z-0">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        class="px-4 py-2 rounded-t-md transition-all"
        :class="
          activeTab === tab.value
            ? 'bg-cyan-500 text-white '
            : 'bg-gray-200 text-black scale-90 opacity-50'
        "
      >
        {{ tab.name }}
      </button>
    </div>
  </div>
</template>
