import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { log } from 'console'

export const useNewsStore = defineStore('news', () => {
  const articles = ref([])

  function setArticles(newArticles: []) {
    articles.value = newArticles
  }

  return { articles, setArticles }
})
