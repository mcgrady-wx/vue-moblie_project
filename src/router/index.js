import Vue from 'vue'
import Router from 'vue-router'

//导入路由页面
import Home from '../pages/Home.vue'
import Member from '../pages/Member.vue'
import Shopcar from '../pages/Shopcar.vue'
import Search from '../pages/Search.vue'
import Newlist from "../pages/Newlist.vue"
import Newinfo from "../pages/Newinfo.vue"
import Photolist from "../pages/Photolist.vue"
import Photoinfo from "../pages/Photoinfo.vue"
import Goodslist from "../pages/Goodslist.vue"
import Goodsinfo from "../pages/Goodsinfo.vue"
import GoodsDesc from "../pages/GoodsDesc.vue"
import GoodsComment from "../pages/GoodsComment.vue"

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [//配置路由
   {path:'/',redirect:'/home'},//设置路由重定向
   {path:'/home',component:Home},
   {path:'/member',component:Member},
   {path:'/shopcar',component:Shopcar},
   {path:'/search',component:Search},
   {path:'/home/news',component:Newlist},
   {path:'/home/news/:id',component:Newinfo},
   {path:'/home/photo',component:Photolist},
   {path:'/home/photo/:id',component:Photoinfo},
   {path:'/home/goods',component:Goodslist},
   {path:'/home/goods/:id',component:Goodsinfo},
   {path:'/home/goodsdesc/:id',component:GoodsDesc},
   {path:'/home/goodscomment/:id',component:GoodsComment}
  ],
  linkActiveClass:'mui-active'//把默认点击高亮的class类router-link-active 改为自己设置的
})
