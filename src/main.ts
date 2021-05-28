import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')
import request from './network/request'
const app = createApp(App)
app.config.globalProperties.$api = request
app.use(store).use(router).use(Antd).mount('#app')
