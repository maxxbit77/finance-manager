<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="bg-slate-900 text-white pl-4">
    <Navbar />
    <RouterView />
  </div>
</template>
