<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

onBeforeRouteUpdate((to, from, next) => {
  isMounted.value = false
  next()
  setTimeout(() => {
    isMounted.value = true
  }, 0)
})
</script>

<template>
  <div>
    <YouTubePlayer v-if="isMounted" />
  </div>
</template>
