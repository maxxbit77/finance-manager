import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css' // Importación de Tailwind
import { createPinia } from 'pinia'
import router from './router' // Importación del router

const app = createApp(App)

app.use(createPinia())
app.use(router) // IMPORTANTE: Aquí estás registrando el router
app.mount('#app')
