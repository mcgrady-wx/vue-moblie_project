<template>
    <div class="goodsinfo">
        <!-- 小球动画 -->
        <transition 
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
        <!-- 使用mui中的card代码段实现卡片视图 -->
        <!-- 轮播图 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <goods-swipe :lunbolists="lunbolists" :infull=false></goods-swipe>
                </div>
            </div>
        </div>
        <!-- 购买卡片 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>
                        市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量:<goods-numbox @getCount="getSelectCount" :max="goodsinfo.stock_quantity"></goods-numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="toShopcar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 详情卡片 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsinfo.time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="godesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="gocomment(id)">商品评价</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import swipe from '../components/Swipe.vue'
import Numbox from '../components/Numbox.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,//商品id
            lunbolists:[],//轮播图
            goodsinfo:{},//商品详细资料
            ballflag:false,
            num:1//保存从子组件传递过来的购买商品数量，默认1
        }
    },
    methods: {
        getGoods(){//获取商品轮播图
            this.$http.get('/static/goods'+this.id+'.json').then(
                (reslut)=>{//请求成功的函数
                    if (reslut.data.state == 1) {//成功
                        this.lunbolists=reslut.data.data
                    }    
                },
                ()=>{//请求失败的函数
                    Toast("数据加载失败")
                }
            )          
        },
        getGoodsinfo(){//获取商品详细资料
            this.$http.get('/static/goodsinfo'+this.id+'.json').then((reslut)=>{//请求成功的函数
                    if (reslut.data.state == 1) {//成功
                        this.goodsinfo=reslut.data.data[0]
                    }    
                })          
        },
        godesc(id){//跳转到图文介绍
            this.$router.push('/home/goodsdesc/'+id)
        },
        gocomment(id){//跳转到商品评价
            this.$router.push('/home/goodscomment/'+id)
        },
        toShopcar(){//添加到购物车和小球动画
            this.ballflag=!this.ballflag
            //通过vuex调用方法修改仓库中count的值
            //获取到所有需要的数据
            let carobj={
                count:this.num,
                id:this.id,
                title:this.goodsinfo.title,
                price:this.goodsinfo.sell_price,
                url:this.lunbolists[0].img,
                selected:true
            }
            this.$store.commit('getcar',carobj)

           
        },
        // 小球的三个动画钩子函数
        beforeEnter(el){
            el.style.transform="translate(0,0)"//初始化小球位置
        },
        enter(el,done){
            el.offsetWidth//随便设置一个才会有动画效果

            // 存在BUG：当滑动的位置改变或者屏幕分辨率改变都会导致小球最终到达的位置发生偏差，所有小球最终位置的坐标不能设置为固定值
            // 解决方法：使用js的 Element.getBoundingClientRect()方法获取到小球初始位置和最终位置距离顶部和左部的位置，然后用最终位置减去初始位置得到最终位置的坐标

            //获取小球距离顶部和左部的坐标
            let ballPosition=this.$refs.ball.getBoundingClientRect()
            //console.log(ballPosition)

            //获取到购物车图标距离顶部和左部的坐标，在这最简单的方法是直接操作dom元素，给要操作的元素添加一个id 通过原生JS来获取元素
            let badgePosition=document.getElementById("badge").getBoundingClientRect()
            //console.log(badgePosition)

            //小球最终的x y轴的值
            let x=badgePosition.left-ballPosition.left
            let y=badgePosition.top-ballPosition.top

            el.style.transform=`translate(${x}px,${y}px)`//小球最终的位置
            el.style.transition="all 0.5s cubic-bezier(.17,.67,.83,.67)"//设置动画效果，使用贝塞尔曲线(cubic-bezier)设置小球的运动轨迹

            //最后调用done函数 done()===afterEnter(el)
            done()
        },
        afterEnter(el){
            this.ballflag=!this.ballflag//隐藏小球
        },
        getSelectCount(count){//通过方法调用获取到子组件传递过来的购买数量
            //console.log("购买"+count+"件")
            this.num=count
        }
    },
    created() {
        this.getGoods()//获取商品轮播图
        this.getGoodsinfo()//获取商品详细资料
    },
    components:{
        "goods-swipe":swipe,
        "goods-numbox":Numbox
    }
}
</script>

<style>
    .goodsinfo{
        background-color: #eee;
        overflow: hidden;
    }
    .now_price{
        color: red;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
    }
    .mui-card-footer .mint-button{
        margin: 15px 0;
    }
    .ball{
        width: 15px;
        height: 15px;
        background: red;
        z-index: 99;
        border-radius: 50%;
        position: absolute;
        top:390px;
        left: 140px;
    }

</style>