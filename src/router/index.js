import Vue from 'vue'
import Router from 'vue-router'

//导入路由页面
import Home from '../pages/Home.vue'
import Member from '../pages/Member.vue'
import Shopcar from '../pages/Shopcar.vue'
import Search from '../pages/Search.vue'
import Newlist from "../components/Newlist.vue"
import Newinfo from "../components/Newinfo.vue"

Vue.use(Router)

export default new Router({
  routes: [//配置路由
   {path:'/',redirect:'/home'},//设置路由重定向
   {path:'/home',component:Home},
   {path:'/member',component:Member},
   {path:'/shopcar',component:Shopcar},
   {path:'/search',component:Search},
   {path:'/home/news',component:Newlist},
   {path:'/home/news/:id',component:Newinfo}
  ],
  linkActiveClass:'mui-active'//把默认点击高亮的class类router-link-active 改为自己设置的
})
