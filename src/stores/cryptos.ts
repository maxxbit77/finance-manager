import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCryptoStore = defineStore('cryptos', () => {
  const cryptos = ref([])

  function setCryptoList(cryptoList: []) {
    console.log('cryptos in store', cryptoList)
    cryptos.value = cryptoList
  }

  return { cryptos, setCryptoList }
})
