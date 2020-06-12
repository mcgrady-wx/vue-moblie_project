<template>
    <div class="goodsinfo">
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
                    <p>购买数量:<goods-numbox></goods-numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
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
                <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                <mt-button type="danger" size="large" plain>商品评价</mt-button>
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
            goodsinfo:{}
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

</style>