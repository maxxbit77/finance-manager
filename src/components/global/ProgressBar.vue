<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

const emit = defineEmits(['completed'])

const progressValue = ref(0)
const duration = 60 * 60 * 1000 // 5 minutos en milisegundos
const intervalTime = 200 // Intervalo de actualización (1 segundo)
const saveInterval = 10 * 1000 // Guardar cada 10 segundos
const step = 100 / (duration / intervalTime) // Incremento por cada intervalo
const sessionKey = 'progressBarTimestamp'

let interval: ReturnType<typeof setInterval> | null = null
let lastSaveTime = Date.now()

onMounted(() => {
  const savedTimestamp = sessionStorage.getItem(sessionKey)
  const now = Date.now()

  if (savedTimestamp) {
    const savedProgress = Number(sessionStorage.getItem('progressValue'))
    if (!isNaN(savedProgress)) {
      progressValue.value = savedProgress // Continuar desde el último valor guardado
    }
  } else {
    sessionStorage.setItem(sessionKey, String(now)) // Guardar el tiempo inicial
  }

  interval = setInterval(() => {
    if (progressValue.value < 100) {
      progressValue.value = Math.min(100, progressValue.value + step)

      // Guardar el progreso y el tiempo cada 10 segundos
      if (Date.now() - lastSaveTime >= saveInterval) {
        sessionStorage.setItem(sessionKey, String(Date.now()))
        sessionStorage.setItem('progressValue', String(progressValue.value))
        lastSaveTime = Date.now()
      }
    } else {
      progressValue.value = 0 // Reiniciar progreso
      sessionStorage.setItem(sessionKey, String(Date.now())) // Nuevo inicio
      sessionStorage.setItem('progressValue', String(progressValue.value)) // Guardar reinicio
      lastSaveTime = Date.now()
      emit('completed')
    }
  }, intervalTime)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <ProgressRoot
    :value="progressValue"
    class="relative overflow-hidden bg-blackA9 rounded-full w-full h-1"
    style="transform: translateZ(0)"
  >
    <ProgressIndicator
      class="bg-green-400 rounded-full w-full h-full transition-transform duration-[1000ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
      :style="`transform: translateX(-${100 - progressValue}%)`"
    />
  </ProgressRoot>
</template>
