<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()

const views = [
  { name: 'Home', icon: 'mdi-home', path: '/' },
  { name: 'Resume', icon: 'mdi-chart-line', path: '/resume' },
  { name: 'Invest', icon: 'mdi-finance', path: '/investment' },
  { name: 'Crypto', icon: 'mdi-bitcoin', path: '/crypto' },
  { name: 'Goals', icon: 'mdi-target', path: '/goals' },
  { name: 'Profile', icon: 'mdi-account', path: '/profile' },
  { name: 'Logout', icon: 'mdi-logout', path: '/logout' },
]
</script>
<template>
  <div class="">
    <div class="size-28"><img src="../assets/finances-logo.png" alt="finances-logo" /></div>
    <div class="py-8 flex justify-center items-center">
      <nav class="border-2 w-16 rounded-lg py-3 flex flex-col items-center space-y-8 bg-terciary">
        <div
          v-for="(item, index) in views"
          :key="index"
          class="flex justify-center items-center w-full"
        >
          <RouterLink :to="item.path">
            <div
              class="flex justify-center items-center"
              :class="{
                'bg-gray-500 rounded-lg w-12 h-12 ': route.path === item.path,
                'text-white cursor-pointer transition-all ease-in-out	': true,
              }"
            >
              <Icon
                :icon="item.icon"
                class="w-10 h-10 text-white cursor-pointer hover:scale-110 transition-all"
              />
            </div>
          </RouterLink>
        </div>
      </nav>
    </div>
  </div>
</template>
