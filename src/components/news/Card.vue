<script setup lang="ts">
import type { Article } from '../../types/news'

const props = defineProps<{
  articles: Article[]
}>()
</script>
<template>
  <div class="col-span-1">
    <ul class="">
      <template v-for="(article, index) in articles" :key="index">
        <li>
          <article class="border-2 p-2 rounded-lg mb-5">
            <a :href="article.url" target="_blank" rel="noopener noreferrer">
              <h3 v-if="article.title" class="font-bold text-2xl">{{ article.title }}</h3>
              <div class="flex justify-between items-center mt-2 w-full">
                <p v-if="article.author" class="text-secondary text-xs w-2/3">
                  {{ article.author }}
                </p>
                <span v-if="article.publishedAt" class="text-xs text-gray-400">
                  {{ new Date(article.publishedAt).toLocaleString() }}
                </span>
              </div>
              <p v-if="article.content" class="my-3 line-clamp-3">{{ article.content }}</p>
              <img
                v-if="article.urlToImage"
                :src="article.urlToImage"
                :alt="article.title"
                class="rounded"
              />
            </a>
          </article>
        </li>
      </template>
    </ul>
  </div>
</template>
