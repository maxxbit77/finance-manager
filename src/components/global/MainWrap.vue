<script setup lang="ts">
const props = withDefaults(defineProps<{}>(), {})
</script>
<template>
  <div class="mt-14">
    <div class="grid grid-cols-3 gap-4 h-full">
      <slot />
    </div>
  </div>
</template>
