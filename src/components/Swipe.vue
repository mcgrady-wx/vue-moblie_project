<template>
    <div>
        <mt-swipe>
            <mt-swipe-item v-for="(item, index) in lunbolists" :key="index">
                <img :src="item.img" alt="" :class="{full:infull}">
            </mt-swipe-item>
            
        </mt-swipe>
    </div>
</template>

<script>
export default {
    // 两个参数 lunbolists为图片数据，每个对象的数据名称是img  infull表示是否宽度100%，true表示宽度100%，false表示宽度自适应
    props:["lunbolists","infull"]
}
</script>

<style>
    .mint-swipe{
        height: 200px;
        text-align: center;
    }
    .mint-swipe-item img{
        /* width: 100%; */
        height: 100%;
    }
    .full{
        width: 100%;
    }
</style>