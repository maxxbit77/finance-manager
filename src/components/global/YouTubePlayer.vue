<script setup lang="ts">
import { onMounted, ref } from 'vue'

const player = ref<any>(null) // Referencia al reproductor
const videoIds = ['dQw4w9WgXcQ', '3JZ_D3ELwOQ', 'e-ORhEE9VVg'] // Lista de IDs de videos de YouTube

const loadYouTubePlayer = () => {
  // Verifica que la API esté cargada
  window.onYouTubeIframeAPIReady = () => {
    player.value = new YT.Player('youtube-player', {
      height: '360',
      width: '640',
      playerVars: {
        autoplay: 1, // Reproducción automática
        controls: 1, // Controles visibles
        rel: 0, // No mostrar videos relacionados
        modestbranding: 1, // Branding mínimo de YouTube
        mute: 1, // Silenciar automáticamente
        playlist: videoIds.join(','), // Lista de reproducción
      },
      events: {
        onReady: (event: any) => {
          // Silencia y reproduce el video
          event.target.mute() // Silencia el video para que se reproduzca automáticamente
          event.target.playVideo()
        },
        onStateChange: (event: any) => {
          if (event.data === YT.PlayerState.ENDED) {
            player.value.nextVideo() // Avanza al siguiente video
          }
        },
      },
    })
  }
}

onMounted(() => {
  loadYouTubePlayer()
})
</script>

<template>
  <div>
    <!-- Aquí va el contenedor del reproductor -->
    <div id="youtube-player"></div>
  </div>
</template>
