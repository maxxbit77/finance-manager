<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Coin } from '@/types/cryptoCoin'
import Dialog from '@/components/global/Dialog.vue'

const props = defineProps<{ cryptoData: Coin[] }>()

const isDialogOpen = ref<boolean>(false)
const selectedCoinId = ref<string>('')

const openDialog = (id: string) => {
  selectedCoinId.value = id
  isDialogOpen.value = true
}

const formattedCryptos = computed(() => {
  return (props.cryptoData ?? []).map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    price: coin.current_price ?? 0,
    change: coin.price_change_percentage_24h ?? 0,
    size: rectangleSizeFormat(coin.price_change_percentage_24h),
    fontSize: textSizeFormat(coin.price_change_percentage_24h),
    logoSize: logoSizeFormat(coin.price_change_percentage_24h),
  }))
})

const rectangleSizeFormat = (change: number) => {
  const size = Math.floor(Math.abs(change))
  return Math.max(1, size)
}

const textSizeFormat = (change: number) => {
  return `${Math.max(10, Math.floor(Math.abs(change) * 2) + 10)}px`
}
const logoSizeFormat = (change: number) => {
  return `${Math.max(10, Math.floor(Math.abs(change) * 2) + 30)}px`
}
</script>

<template>
  <div class="h-screen overflow-scroll">
    <div class="grid grid-cols-6 grid-flow-dense bg-green-700">
      <div
        v-for="crypto in formattedCryptos"
        :key="crypto.id"
        class="coin-tile flex flex-col items-center justify-center text-white p-2 shadow-inner cursor-pointer outline-none"
        :class="[crypto.change > 0 ? 'bg-green-700 shadow-green-900' : 'bg-red-500 shadow-red-800']"
        :style="{ gridColumn: `span ${crypto.size}`, gridRow: `span ${crypto.size}` }"
        @click="openDialog(crypto.id)"
      >
        <img
          v-if="crypto.image"
          :src="crypto.image"
          :alt="crypto.symbol"
          class="mb-2"
          :style="{ width: crypto.logoSize, height: crypto.logoSize }"
        />
        <p class="font-bold" :style="{ fontSize: crypto.fontSize }">{{ crypto.symbol }}</p>
        <p :style="{ fontSize: crypto.fontSize }">${{ crypto.price.toFixed(2) }}</p>
        <p
          :class="crypto.change > 0 ? 'text-green-200' : 'text-red-200'"
          :style="{ fontSize: crypto.fontSize }"
        >
          {{ crypto.change.toFixed(2) }}%
        </p>
      </div>
    </div>

    <Dialog
      v-if="isDialogOpen"
      :open="isDialogOpen"
      :id="selectedCoinId"
      @close="isDialogOpen = false"
    />
  </div>
</template>

<style scoped>
@keyframes border-rotation {
  0% {
    border-image-source: linear-gradient(0deg, #55ffb6, #42acd2);
  }
  25% {
    border-image-source: linear-gradient(90deg, #55ffb6, #42acd2);
  }
  50% {
    border-image-source: linear-gradient(180deg, #55ffb6, #42acd2);
  }
  75% {
    border-image-source: linear-gradient(270deg, #55ffb6, #42acd2);
  }
  100% {
    border-image-source: linear-gradient(360deg, #55ffb6, #42acd2);
  }
}

.coin-tile {
  transition: all 0.3s ease-in-out;
  border: 3px solid transparent;
  border-image-slice: 1;
}

.coin-tile:hover {
  animation: border-rotation 2s infinite linear;
  border-image-source: linear-gradient(0deg, #1af294, #62caf0);
}
</style>
