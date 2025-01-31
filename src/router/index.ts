import { createRouter, createWebHistory } from 'vue-router'
import CryptoView from '../views/CryptoView.vue'
import MyPortfolioView from '../views/MyPortfolioView.vue'
import InvestView from '../views/InvestView.vue'
import ProfileView from '../views/ProfileView.vue'
import GoalsView from '../views/GoalsView.vue'
import ResumeView from '../views/ResumeView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/resume', component: ResumeView },
    { path: '/crypto', component: CryptoView },
    // { path: '/crypto/coin/:id', component: CoinDetailView },
    { path: '/my-portfolio', component: MyPortfolioView },
    { path: '/investment', component: InvestView },
    { path: '/profile', component: ProfileView },
    { path: '/goals', component: GoalsView },
  ],
})

export default router
