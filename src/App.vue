<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="bg-sky-950 text-white h-screen flex overflow-hidden pr-6">
    <div class="flex flex-col">
      <div class="size-28"><img src="@/assets/finances-logo.png" alt="finances-logo" /></div>
      <Navbar class="flex-shrink-0" />
    </div>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
