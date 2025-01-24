<script setup lang="ts">
const props = withDefaults(defineProps<{}>(), {})
</script>
<template>
  <div>
    <div class="grid grid-cols-3 gap-x-16 h-full">
      <slot />
    </div>
  </div>
</template>
