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
  <Card class="text-sm !bg-gray-500">
    <CardContent class="">
      <div v-for="(item, key) in data" :key="key" class="flex justify-between">
        <div class="flex justify-center items-center">
          <span class="w-2.5">
            <svg width="100%" height="100%" viewBox="0 0 30 30">
              <path
                d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                stroke="#334155"
                fill="#334155"
                stroke-width="1"
              />
            </svg>
          </span>
        </div>
        <span class="font-semibold ml-4 !text-white">{{ item.value }}</span>
      </div>
    </CardContent>
  </Card>
</template>
