import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCryptoStore = defineStore(
  'cryptos',
  () => {
    const cryptos = ref([])

    function setCryptoList(cryptoList: []) {
      console.log('Articles in store:', cryptoList)
      cryptos.value = cryptoList
    }

    return { cryptos, setCryptoList }
  },
  {
    persist: true,
  },
)
