<script setup lang="ts">
import { RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="bg-sky-950 text-white h-screen flex overflow-hidden pr-6">
    <Navbar class="flex-shrink-0" />
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
