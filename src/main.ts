import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'  // Importación correcta de Tailwind
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
