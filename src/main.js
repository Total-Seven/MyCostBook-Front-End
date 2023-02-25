import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/index.css'
// 
import HighchartsVue from 'highcharts-vue'


const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(HighchartsVue)

app.mount('#app')

