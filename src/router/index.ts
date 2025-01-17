import { createRouter, createWebHistory } from 'vue-router'
import Crypto from '../components/sections/Crypto.vue'
import Local from '../components/sections/Local.vue'
import Invest from '../components/sections/Invest.vue'
import Profile from '../components/sections/Profile.vue'
import Goals from '../components/sections/Goals.vue'
import Resume from '../components/sections/Resume.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/resume', component: Resume },
    { path: '/crypto', component: Crypto },
    { path: '/local', component: Local },
    { path: '/investment', component: Invest },
    { path: '/profile', component: Profile },
    { path: '/goals', component: Goals },
  ],
})

export default router
