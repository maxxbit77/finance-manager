<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div>
      <HelloWorld msg="You did it well!!!!" />
      <div class="text-xl text-red">gola</div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>
