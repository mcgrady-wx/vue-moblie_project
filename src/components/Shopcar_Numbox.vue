<template>
    <!-- 购物车使用的numbox -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="count" ref="num" @change="countChange" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    
</template>

<script>
//导入mui的js文件
import mui from '../lib/mui/js/mui.min.js'
export default {
    mounted() {
        //初始化控件
        mui(".mui-numbox").numbox()
    },
    methods: {
        countChange(){
          //console.log(this.$refs.num.value)
          //改变购买数量时，通过vuex的方法改变仓库中的购买数量,需要通过id查找对应的商品，id需要父元素传递过来
          this.$store.commit('changecar',{count:this.$refs.num.value,id:this.id})
        }
    },
    props:['count','id']
}
</script>

<style>
   .mui-numbox{
       height: 25px;
   }
</style>