<template>
    <!-- 使用mui的numbox 来实现选择购买数量 -->
    <!-- 需要通过 this.$emit 来调用父组件传递过来的方法，把购买数量传递给父组件 
         需要给+ -两个按钮和中间的输入框都添加事件，相对麻烦。不管是给哪个添加事件其
         结果都是input框中的value值发生改变，所以可以给input框添加一个@change事件，
         只要数字发生了改变就使用this.$emit方法
    -->
    <!-- 父组件通过max，传递过来库存量，来设置最大购买量 -->
    <!-- 问题是库存量是通过异步请求获得的，如果直接通过 :data-numbox-max='max'得到的将是undefined,刚开始传递的时候数据还未获取到
         因max的数据最终是会获取到的，所以可使用watch来监听max，当获取到max的值的时候，来设置最大购买量
         不通过data-numbox-max属性来设置，而是通过mui提供的setOption() js方法来设置
    -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="num" @change="countChange"/>
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
            //每当input框中的数字发生变化，就把该数字传递给父元素
            this.$emit('getCount',parseInt(this.$refs.num.value))
        }
    },
    props:["max"],
    watch: {
        "max":function(newVal,oldVal){
            //设置最大购买量
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    },
}
</script>

<style>
   
</style>