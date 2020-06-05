<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe>
            <mt-swipe-item v-for="(item, index) in lunbolists" :key="index">
                <img :src="item.img" alt="">
            </mt-swipe-item>
            
        </mt-swipe>
        <!-- 6宫格内容显示 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-order"></span>
                    <div class="mui-media-body">新闻资讯</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-grech"></span>
                    <div class="mui-media-body">图片分享</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
                    <div class="mui-media-body">商品购买</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-comment"></span>
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-computer"></span>
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-custom"></span>
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
        
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            lunbolists:[]
        }
    },
    methods: {
        getlunbotu(){
            // 使用vue-resource发起get请求获得图片数据，获取成功显示图片，获取失败提示图片加载失败
            this.$http.get('/static/lunbo.json').then((reslut)=>{
                //console.log(reslut.data)
                if (reslut.data.state == 1) {//成功
                    this.lunbolists=reslut.data.data
                    //console.log(this.lunbolists)
                } else {//失败
                    Toast("图片加载失败")
                }              
            })
        }
    },
        
    created() {//钩子函数
        this.getlunbotu()
    },
    
}
</script>

<style scoped>
    .mint-swipe{
        height: 200px;
    }
    .mint-swipe-item img{
        width: 100%;
        height: 100%;
    }
    .mui-grid-view,.mui-grid-9{
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:0
    }
    .mui-media-body{
        font-size: 13px;
    }
    
</style>