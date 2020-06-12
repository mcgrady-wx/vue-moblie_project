<template>
    <!-- 使用mui的numbox 来实现选择购买数量 -->
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='99'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
    
</template>

<script>
export default {
    mounted() {
        //初始化控件
        mui(".mui-numbox").numbox()
    },
}
</script>

<style>
   
</style>