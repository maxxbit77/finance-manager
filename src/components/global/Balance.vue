<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    balance: string
  }>(),
  {
    balance: '0',
  },
)
</script>
<template>
  <div>
    <h3 class="text-4xl border-2 border-white bg-gray-800 rounded-lg p-2">
      Balance: {{ balance }}
    </h3>
  </div>
</template>
