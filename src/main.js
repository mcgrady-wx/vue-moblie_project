
import Vue from 'vue'
import App from './App'
import router from './router'
//使用mint-ui的组件，按需加载
import { Header, Swipe, SwipeItem,Button  } from 'mint-ui'
// 导入vue-resource
import VueResource from "vue-resource"
// 注册vue-resource
Vue.use(VueResource)

//导入mui的css样式
import './lib/mui/css/mui.min.css'
//导入mui的扩展图标的css样式
import './lib/mui/css/icons-extra.css'


//注册mint-ui的header组件
Vue.component(Header.name, Header);
// 注册minit-ui的轮播图组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// 注册minit-ui的按钮组件
Vue.component(Button.name, Button);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
