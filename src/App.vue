<template>
  <div id="app">
	<!-- 头部 -->
	<mt-header fixed title="Vue移动项目">
		<span slot="left" v-show="flag" @click="goback">
			<mt-button icon="back">返回</mt-button>
		</span>
	</mt-header>
	<!-- 显示内容区域 动画切换-->
	<transition>
		<router-view></router-view>
	</transition>
	<!-- 底部导航 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{$store.getters.getnum}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
	return {
		flag:false
	}
  },
  methods: {
	goback(){//后退键
		this.$router.go(-1)
	}
  },
  watch: {
		//监测路径变化，如果是首页不显示返回按钮
		//存在BUG，当不在首页的时候刷新了页面，因为路径未发生变化，所有该监听不起作用，需要在钩子函数中进行判断
		'$route.path':function(newVal){
			if (newVal==='/home') {
				this.flag=false
			} else {
				this.flag=true
			}
		}
  },
  created() {
	  this.flag=this.$route.path==='/home'?false:true
  },
}
</script>

<style scoped>
#app{
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 50px;
}

.v-enter{
	opacity: 0;
	transform: translateX(100%);
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,.v-leave-active{
	transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item1.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mint-header{
	z-index: 99;
}
</style>
