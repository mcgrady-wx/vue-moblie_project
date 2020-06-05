
import Vue from 'vue'
import App from './App'
import router from './router'
//使用mint-ui的组件，按需加载
import { Header } from 'mint-ui'

//导入mui的css样式
import './lib/mui/css/mui.min.css'
//导入mui的扩展图标的css样式
import './lib/mui/css/icons-extra.css'


//注册组件
Vue.component(Header.name, Header);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
