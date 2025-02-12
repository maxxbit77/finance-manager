<script setup lang="ts">
import { defineProps } from 'vue'
import type { Coin } from '@/types/cryptoCoin.ts'

const props = defineProps<{
  cryptoData: Coin[]
}>()

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(
    value,
  )
}

const formatPrice = (value: number): string => {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const getChangeClass = (percentChange: number): string => {
  return percentChange >= 0 ? 'text-green-600' : 'text-red-600'
}

const tableHeaders = [
  'Rank',
  'Name',
  'Price',
  '24h %',
  'High 24h',
  'Low 24h',
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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ coin.market_cap_rank }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
            <img :src="coin.image" alt="Logo" class="w-6 h-6 mr-2" />
            {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ formatPrice(coin.current_price) }}
          </td>
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-medium"
            :class="getChangeClass(coin.price_change_percentage_24h)"
          >
            {{ coin.price_change_percentage_24h.toFixed(2) }}%
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ formatPrice(coin.high_24h) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ formatPrice(coin.low_24h) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${{ formatNumber(coin.market_cap) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            ${{ formatNumber(coin.total_volume) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ formatNumber(coin.circulating_supply) }} {{ coin.symbol.toUpperCase() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
