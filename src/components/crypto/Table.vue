<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import type { Coin } from '../../types/cryptoCoin.ts'

const props = defineProps<{
  cryptoData: Coin[]
}>()

const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  return value.toFixed(2)
}

const formatVolume = (value: number): string => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  return value.toFixed(2)
}

const formatSupply = (value: number): string => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
  return value.toFixed(2)
}

const getChangeClass = (percentChange: number): string => {
  return percentChange >= 0 ? 'text-green-600' : 'text-red-600'
}

const tableHeaders = [
  'Rank',
  'Name',
  'Price',
  '1h %',
  '24h %',
  '7d %',
  'Market Cap',
  'Volume (24h)',
  'Circulating Supply',
]
</script>
<template>
  <div class="max-h-screen overflow-auto rounded-lg">
    <table class="w-full bg-white border border-gray-200">
      <thead class="bg-gray-200 sticky -top-1 z-10">
        <tr>
          <th
            v-for="(header, index) in tableHeaders"
            :key="index"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="coin in cryptoData" :key="coin.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ coin.cmc_rank }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ coin.name }} ({{ coin.symbol }})
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${{ coin.quote.USD.price.toFixed(2) }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm"
            :class="getChangeClass(coin.quote.USD.percent_change_1h)"
          >
            {{ coin.quote.USD.percent_change_1h.toFixed(2) }}%
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm"
            :class="getChangeClass(coin.quote.USD.percent_change_24h)"
          >
            {{ coin.quote.USD.percent_change_24h.toFixed(2) }}%
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm"
            :class="getChangeClass(coin.quote.USD.percent_change_7d)"
          >
            {{ coin.quote.USD.percent_change_7d.toFixed(2) }}%
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${{ formatMarketCap(coin.quote.USD.market_cap) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${{ formatVolume(coin.quote.USD.volume_24h) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ formatSupply(coin.circulating_supply) }} {{ coin.symbol }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
