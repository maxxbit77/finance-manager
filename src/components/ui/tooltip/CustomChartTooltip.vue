<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
  title?: string
  data: {
    name: string
    color: string
    value: any
  }[]
}>()
</script>

<template>
  <Card class="text-sm !bg-gray-400">
    <CardContent class="h-8">
      <div v-for="(item, key) in data" :key="key" class="flex justify-between items-center h-8">
        <span class="font-semibold !text-white">${{ item.value }}</span>
      </div>
    </CardContent>
  </Card>
</template>
