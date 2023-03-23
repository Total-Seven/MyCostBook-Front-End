import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/index.css'
import '@/assets/img/fonts/empty/iconfont.css'   //   class=" iconfont "
// icon-jiluqueshengshuxing:before  \  icon-queshengye_kongbaiye-tongyong:before  \icon-queshengye_zanwudongtai:before
// icon-queshengye_zanwufangan:before  \   icon-queshengye_zanwujiaofei:before
// 
import HighchartsVue from 'highcharts-vue'
// 
import Ripple from 'vue-ripple-directive'
// 


const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(HighchartsVue)


app.directive('ripple', Ripple);


app.mount('#app')

