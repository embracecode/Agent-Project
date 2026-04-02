// main.js
import { createApp } from 'vue'
import App from './App1.vue'

import Home from './views/checkcustomRouter/home.vue'
import About from './views/checkcustomRouter/about.vue'

// @ts-ignore
import { createRouter } from './router3.js'

const router = createRouter({
  mode: 'history',   // 可选 'hash' 或 'history'
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')