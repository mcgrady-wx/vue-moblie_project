<template>
    <div>
        <!-- 使用mui的tab-top-webview-main代码段显示顶部选项卡 -->
        <!-- 只有样式，没有拖拽效果需要导入mui的js代码，并初始化 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" data-wid="tab-top-subpage-1.html" v-for="item in controllist" :key="item.id" @click="getPhotolist(item.id)">
                        {{item.title}}
                    </a>   
                </div>
            </div>
        </div>
        <!-- 使用懒加载的方式显示图片，mint-ui的Lazy load -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/photo/'+item.id">
              <img v-lazy="item.url">
              <div class="info">
                <div class="infotitle">{{item.title}}</div>
                <div class="infobody">{{item.zhaiyao}}</div>
              </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
// 存在两个BUG：1、导入后会导致底部导航不能跳转，原因是代码段中，其中一个class类冲突（mui-tab-item），解决方法是把底部导航中和该class类的所有样式全部手动考下来，然后重新命名该class类
//             2、只能刷新后才有拖拽效果，原因是组件初始化的时候还没有mui-scroll-wrapper这个class类，解决办法是把初始化的动作放到vue的钩子函数当中去mounted(){}
//导入mui的js文件
import mui from '../lib/mui/js/mui.min.js'
// //初始化滑动控件
// mui('.mui-scroll-wrapper').scroll({
// 	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
//  })
export default {
    data(){
        return {
            controllist:[],
            list:[]//图片列表
        }
    },
    methods: {
        getControllist(){//获取选择条数据选项
            this.$http.get('/static/controllist.json').then((reslut)=>{
                if (reslut.data.state == 1) {//成功
                    this.controllist=reslut.data.data
                    //console.log(this.controllist)
                }         
            })

        },
        getPhotolist(photoid){//获取图片列表
            var url="/static/photolist"+photoid+".json"
            //console.log(url)
            this.$http.get(url).then((reslut)=>{
                if (reslut.data.state == 1) {//成功
                    this.list=reslut.data.data
                    //console.log(this.controllist)
                }         
            })
        },
       
    },
    created() {
        //获取到选项数据
        this.getControllist()
        //获取到图片列表,默认获取全部
        this.getPhotolist(0)
    },
    mounted() {//组件插入到真是DOM后执行
        //初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
    },
}
</script>

<style>
    img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
    }
    *{
        touch-action: none; 
    }
    .photo-list{
        padding:10px;
        margin: 0;
        padding-bottom: 0;
    }
    .photo-list li{
        background-color: #ccc;
        list-style: none;
        margin-bottom: 10px;
        position: relative;
        text-align: left;
        box-shadow: 0 0 9px #999;
    }
    .photo-list li img{
        width: 100%;
        vertical-align: middle;
    }
    .photo-list li .info{
        color: white;
        position: absolute;
        bottom: 0;
        background-color:rgba(0, 0, 0, 0.4);
        max-height: 85px;
    }
    .photo-list li .info .infotitle{
        font-size: 14px;
    }
    .photo-list li .info .infobody{
        font-size: 13px;
    }
</style>