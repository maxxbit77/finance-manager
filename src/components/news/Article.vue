<script setup lang="ts">
import type { Article } from '../../types/news'
import axios from 'axios'
import Card from '../news/Card.vue'
import { ref, onMounted, computed } from 'vue'
import { useNewsStore } from '../../stores/news'

const newsStore = useNewsStore()
const articles = ref<Article[]>(newsStore.articles as Article[])

async function fetchNews() {
  const url =
    'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4d8431ec164a45a18a2ea23e0419d918'
  try {
    const response = await axios.get(url)
    if (response) {
      const newsStore = useNewsStore()
      newsStore.setArticles(response.data.articles)
      articles.value = newsStore.articles
    }
  } catch (error: any) {
    console.error('Error al obtener las noticias:', error.response?.data || error.message)
  }
}

const firstColumn = computed(() => articles.value.slice(0, Math.ceil(articles.value.length / 2)))
const secondColumn = computed(() => articles.value.slice(Math.ceil(articles.value.length / 2)))

onMounted(() => {
  if (newsStore.articles.length === 0) {
    fetchNews()
  } else {
    articles.value = newsStore.articles
  }
})
</script>
<template>
  <div class="grid grid-cols-2 space-x-5">
    <Card :articles="firstColumn" />
    <Card :articles="secondColumn" />
  </div>
</template>
