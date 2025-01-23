<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import Image from './Image.vue'
import { useNewsStore } from '../../stores/news'
const newsStore = useNewsStore()
const articles = ref(newsStore.articles)

async function fetchNews() {
  const url =
    'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4d8431ec164a45a18a2ea23e0419d918'
  try {
    const response = await axios.get(url)
    if (response) {
      const newsStore = useNewsStore()
      newsStore.setArticles(response.data.articles)
      console.log('Articles saved in store:', newsStore.articles)
    }
  } catch (error) {
    console.error('Error al obtener las noticias:', error.response?.data || error.message)
  }
}

onMounted(() => {
  if (newsStore.articles.length === 0) {
    fetchNews()
  }
})
</script>
<template>
  <div>
    <template v-for="(article, index) in articles" :key="index">
      {{ article }}
      <Image :image="article.urlToImage" />
    </template>
  </div>
</template>
