<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

const views = [
  { name: 'Home', icon: 'mdi-home', path: '/' },
  { name: 'Resume', icon: 'mdi-chart-line', path: '/resume' },
  { name: 'Local', icon: 'mdi-bank', path: '/local' },
  { name: 'Invest', icon: 'mdi-finance', path: '/investment' },
  { name: 'Crypto', icon: 'mdi-bitcoin', path: '/crypto' },
  { name: 'Goals', icon: 'mdi-target', path: '/goals' },
  { name: 'Profile', icon: 'mdi-account', path: '/profile' },
  { name: 'Logout', icon: 'mdi-logout', path: '/logout' },
]
</script>
<template>
  <div class="py-8 flex justify-left items-center">
    <nav class="border-2 w-16 rounded-lg py-3 flex flex-col items-center space-y-8">
      <div
        v-for="(item, index) in views"
        :key="index"
        class="flex justify-center items-center w-full"
      >
        <RouterLink :to="item.path">
          <Icon
            :icon="item.icon"
            class="text-4xl text-white cursor-pointer hover:scale-125 transition-all"
          />
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
