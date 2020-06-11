
import Vue from 'vue'
import App from './App'
import router from './router'
// //使用mint-ui的组件，按需加载
// import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'

// //注册mint-ui的header组件
// Vue.component(Header.name, Header);
// // 注册minit-ui的轮播图组件
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// // 注册minit-ui的按钮组件
// Vue.component(Button.name, Button);
// //注册懒加载
// Vue.use(Lazyload);
//使用懒加载，不能按需加载mint-ui，只能全局注册使用
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 导入vue-resource
import VueResource from "vue-resource"
// 注册vue-resource
Vue.use(VueResource)
//Vue.http.options.root = '/root';//设置请求的根路径
Vue.http.options.emulateJSON = true;//全局设置post请求时候 按照表单数据格式请求

//导入mui的css样式
import './lib/mui/css/mui.min.css'
//导入mui的扩展图标的css样式
import './lib/mui/css/icons-extra.css'

//引入vue-preview组件，实现图片缩略图显示
import vuePicturePreview from 'vue-picture-preview';
Vue.component('Previewer', vuePicturePreview);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
