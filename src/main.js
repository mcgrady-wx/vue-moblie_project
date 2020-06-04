
import Vue from 'vue'
import App from './App'
import router from './router'
import { Header } from 'mint-ui'
import './lib/mui/css/mui.min.css'

Vue.component(Header.name, Header);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
