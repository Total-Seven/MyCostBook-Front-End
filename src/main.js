import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/index.css'
import '@/assets/img/fonts/empty/iconfont.css'   //   class=" iconfont "
// 
import HighchartsVue from 'highcharts-vue'
// 
import Ripple from 'vue-ripple-directive'
// 
// import io from 'socket.io-client'
// const socket = io('http://127.0.0.1:7001', {
//     query: {},
//     transports: ['websocket', 'polling'],
//     timeout: 5000,
// })

const app = createApp(App)
// app.config.globalProperties.$socket = socket


app.use(router)
app.use(pinia)
app.use(HighchartsVue)



app.directive('ripple', Ripple);

app.mount('#app')

