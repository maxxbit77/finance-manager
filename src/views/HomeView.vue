<script setup lang="ts">
import Balance from '../components/global/Balance.vue'
import AddTransaction from '../components/global/AddTransaction.vue'
import MainWrap from '../components/global/MainWrap.vue'
import NewsArticles from '../components/news/Article.vue'
import RadialChart from '../components/widgets/RadialChart.vue'
import AreaChart from '../components/widgets/AreaChart.vue'
import GaugeChart from '../components/widgets/GaugeChart.vue'
import YoutubePlayer from '../components/global/YouTubePlayer.vue'
</script>

<template>
  <div class="w-full">
    <header class="flex justify-between items-center mt-6">
      <h1 class="text-4xl font-bold">Welcome User</h1>
      <Balance class="text-lg" balance="123123">Total Balance</Balance>
      <AddTransaction />
    </header>
    <div class="flex justify-between mt-14 mb-2">
      <h3 class="text-end font-bold text-4xl text-secondary">Markets</h3>
      <h3 class="text-end font-bold text-4xl text-secondary">Latest News</h3>
    </div>
    <MainWrap>
      <div class="flex flex-col gap-y-3">
        <div class="col-span-1">
          <div class="text-white">
            <RadialChart title="Resume" />
          </div>
        </div>

        <div class="col-span-2 bg-terciary rounded-lg p-4"></div>

        <div class="col-span-2 bg-terciary rounded-lg p-4">
          <GaugeChart />
        </div>
      </div>
      <div class="col-span-2 overflow-y-auto max-h-dvh">
        <NewsArticles />
      </div>
    </MainWrap>
  </div>
</template>
