<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'radix-vue'
import { LineChart } from '@/components/ui/chart-line'
import CustomChartTooltip from '@/components/ui/tooltip/CustomChartTooltip.vue'
import { defineEmits, ref, onMounted, computed, watchEffect } from 'vue'
import { Icon } from '@iconify/vue'
import { getCoinChartById } from '@/services/useCoinGeckoService'
import type { Coin, CoinChart } from '@/types/cryptoCoin'
import { useCryptoStore } from '@/stores/cryptos'
import Spinner from '@/components/global/Spinner.vue'

const props = defineProps<{
  open: boolean
  id: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const cryptoStore = useCryptoStore()

const coinStoreData = ref<Coin | null>(null)
const coinChart = ref<CoinChart | null>(null)
const showContent = ref<boolean>(false)
const isLoading = ref<boolean>(true)
const chartData = ref<{ date: string; price: number }[]>([])
const calculatorQuantity = ref<number>(1)
const animatedValue = ref(0)

const coin = computed(() => {
  if (coinStoreData.value && coinChart.value) {
    return {
      ...coinStoreData.value,
      chart: coinChart.value,
    }
  }
  return null
})

const targetValue = computed(() => {
  if (coin.value?.current_price && calculatorQuantity.value > 0) {
    return calculatorQuantity.value * coin.value.current_price
  }
  return 0
})

watchEffect(() => {
  const step = 50

  const animate = () => {
    if (Math.abs(animatedValue.value - targetValue.value) < 0.01) {
      animatedValue.value = targetValue.value
      return
    }

    animatedValue.value += (targetValue.value - animatedValue.value) / step
    requestAnimationFrame(animate)
  }

  animate()
})

const calculator = computed(() => animatedValue.value.toFixed(2))

const closeDialog = () => {
  emit('close')
  showContent.value = false
}

const chartLineColor = computed(() => {
  if (coin.value && coin.value?.price_change_percentage_24h > 0) {
    return ['green']
  } else {
    return ['red']
  }
})

function convertTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}-${month} ${hours}:${minutes}`
}

watchEffect(() => {
  if (coinChart.value && Array.isArray(coinChart.value.prices)) {
    chartData.value = coinChart.value.prices.map(([timestamp, price]) => ({
      date: convertTimestampToDate(timestamp),
      price,
    }))
  }
})

onMounted(async () => {
  if (props.id) {
    try {
      coinStoreData.value = cryptoStore.getCryptoById(props.id)
      coinChart.value = await getCoinChartById(props.id)
      showContent.value = true
    } catch (error) {
      console.error('Error to load data', error)
    } finally {
      isLoading.value = false
    }
  }
})
</script>

<template>
  <DialogRoot v-model:open="props.open">
    <DialogPortal>
      <DialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
        @click="closeDialog"
      />
      <DialogContent
        class="coin-tile data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[600px] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] bg-sky-950 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100] text-white rounded-lg"
      >
        <!-- Coin title -->
        <DialogTitle class="text-mauve12 m-0 text-2xl font-semibold">
          <div v-if="coin" class="flex justify-center space-x-2">
            <img v-if="coin?.image" :src="coin.image" :alt="coin.name" class="size-8" />
            <span>{{ coin.name }}</span>
          </div>
          <span v-else class="opacity-0">Loading...</span>
        </DialogTitle>

        <!-- Calculator -->

        <!-- Data -->
        <DialogDescription
          class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal flex justify-evenly items-center"
        >
          <div v-if="coin" class="flex flex-col justify-center items-center">
            <p class="text-gray-400 text-xl">Range</p>
            <span> # {{ coin.market_cap_rank }}</span>
          </div>
          <div v-if="coin" class="flex flex-col justify-center items-center">
            <p class="text-gray-400 text-xl">Market Cap</p>
            <span> {{ coin.market_cap }}</span>
          </div>
          <div v-if="coin" class="flex flex-col justify-center items-center">
            <p class="text-gray-400 text-xl">Price change 24h</p>
            <span> {{ coin.price_change_percentage_24h.toFixed(2) }}%</span>
          </div>
        </DialogDescription>
        <DialogDescription>
          <div v-if="coin" class="flex justify-center items-center space-x-3">
            <div class="relative group">
              <Icon
                icon="mdi-light:pencil"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 text-white size-7 group-focus-within:text-black"
              />
              <input
                v-model="calculatorQuantity"
                type="text"
                class="pl-8 pr-2 py-1 text-center rounded-lg text-white bg-gray-500 focus:text-black focus:bg-white outline-none focus:font-bold"
              />
            </div>
            <span class="text-gray-400"> {{ coin?.name }} = </span>
            <span class="font-bold"> {{ calculator }} $ </span>
          </div>
        </DialogDescription>

        <!-- Chart -->
        <DialogDescription>
          <LineChart
            v-if="chartData.length > 0"
            class="h-[300px] w-full"
            :data="chartData"
            :categories="['price']"
            index="date"
            :colors="chartLineColor"
            :showXAxis="true"
            :showYAxis="true"
            :showGridLine="true"
            :y-formatter="
              (tick) =>
                typeof tick === 'number' ? `$ ${new Intl.NumberFormat('us').format(tick)}` : ''
            "
            :custom-tooltip="CustomChartTooltip"
          />
        </DialogDescription>

        <div v-if="!showContent" class="flex flex-col items-center justify-center space-y-4">
          <span class="text-sky-400 text-lg font-semibold">Loading...</span>
          <Spinner class="size-20" />
        </div>

        <div v-else>
          <DialogClose
            class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
            @click="closeDialog"
          >
            <Icon icon="lucide:x" />
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
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
  animation: border-rotation 2s infinite linear;
  border-image-source: linear-gradient(0deg, #1af294, #62caf0);
}
</style>
