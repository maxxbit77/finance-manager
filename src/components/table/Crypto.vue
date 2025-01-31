<script setup lang="ts">
import type { Coin } from '../../types/cryptoCoin'
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  cryptoData: Coin[]
}>()

console.log(props.cryptoData)

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
</script>
<template>
  <!-- Contenedor con alto fijo y scroll -->
  <div class="max-h-screen overflow-auto rounded-lg">
    <table class="w-full bg-white border border-gray-200">
      <!-- Cabecera fija -->
      <thead class="bg-gray-200 sticky -top-1 z-10">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Rank
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Price
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            1h %
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            24h %
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            7d %
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Market Cap
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Volume (24h)
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Circulating Supply
          </th>
        </tr>
      </thead>
      <!-- Cuerpo de la tabla -->
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
