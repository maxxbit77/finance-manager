<script setup lang="ts">
const props = defineProps<{
  image: string
  alt: string
}>()
</script>
<template>
  <div>
    <img :src="image" alt="" />
  </div>
</template>
