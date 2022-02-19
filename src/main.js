import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入ant-desifn-vue组件库
import Antd from 'ant-design-vue'
// import STable from '@surely-vue/table';
// 导入组件库样式表
import 'ant-design-vue/dist/antd.css';
// import '@surely-vue/table/dist/index.css'
// import STable from '@surely-vue/table';
import store from './store'

Vue.config.productionTip = false
// 安装组件库
Vue.use(Antd)
// Vue.use(STable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
