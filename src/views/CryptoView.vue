<script setup lang="ts">
import { ref, onMounted, computed, shallowRef } from 'vue'
import { useCryptoStore } from '@/stores/cryptos'
import CryptoTable from '@/components/crypto/Table.vue'
import RectanglesMap from '@/components/crypto/RectanglesMap.vue'
import { fetchCoinGeckoData } from '@/services/useCoinGeckoService'
import Spinner from '@/components/global/Spinner.vue'
import { Progress } from '@/components/ui/progress'
import type { Coin } from '@/types/cryptoCoin'

const cryptoStore = useCryptoStore()
const activeTab = ref('rectangle')
const cryptoData = ref<Coin[]>([])
const tabs = shallowRef([
  { name: 'Hot Map', value: 'rectangle', component: RectanglesMap },
  { name: 'Market Cap', value: 'list', component: CryptoTable },
])

const componenteActivo = computed(() => {
  const tab = tabs.value.find((t) => t.value === activeTab.value)
  return tab ? tab.component : null
})

onMounted(async () => {
  if (cryptoData.value.length <= 0) {
    const data = await fetchCoinGeckoData(
      'GET',
      '/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100',
    )
    cryptoData.value = data
    cryptoStore.setCryptoList(data)
  }
})
</script>

<template>
  <div class="relative">
    <h1 class="text-3xl mt-12 mb-24">Today's Cryptocurrency Prices by Market Cap</h1>

    <div class="z-10 relative" v-if="cryptoData.length > 0">
      <Progress :model-value="33" />
      <component :is="componenteActivo" v-if="componenteActivo" :cryptoData="cryptoData" />
    </div>
    <div v-else class="flex justify-center items-center my-auto">
      <p class="text-cyan-500 text-5xl">Loading</p>
      <Spinner class="w-16" />
    </div>

    <div class="flex ml-1.5 absolute top-24 -left-1.5 w-full z-0">
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
