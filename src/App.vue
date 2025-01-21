<script setup lang="ts">
import { RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="bg-sky-950 text-white pl-4 h-screen flex">
    <Navbar />
    <RouterView />
  </div>
</template>
