import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Coin } from '@/types/cryptoCoin'

export const useCryptoStore = defineStore(
  'cryptos',
  () => {
    const cryptos = ref<Coin[]>([])

    function setCryptoList(cryptoList: Coin[]) {
      console.log('Cryptos in store:', cryptoList)
      cryptos.value = cryptoList
    }

    function getCryptoById(id: string): Coin | null {
      return cryptos.value.find((coin) => coin.id === id) || null
    }

    return { cryptos, setCryptoList, getCryptoById }
  },
  {
    persist: true,
  },
)
