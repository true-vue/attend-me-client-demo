import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { AttendMeBackendClient } from './backend/AttendMeBackendClient'

const backend = new AttendMeBackendClient('https://attendme-backend.runasp.net')

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

export { backend as Backend }
