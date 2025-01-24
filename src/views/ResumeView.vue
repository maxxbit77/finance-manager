<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

// Detecta cambios en la ruta y fuerza la recreación
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
    <!-- Solo se muestra el componente si `isMounted` es verdadero -->
    <YouTubePlayer v-if="isMounted" />
  </div>
</template>
