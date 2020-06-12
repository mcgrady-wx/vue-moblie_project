<template>
    <div class="goods-list">
        <!-- 不使用router-link导航，使用编程式导航实现跳转 -->
        <div class="goods-item" v-for="item in goodslists" :key="item.id" @click="getoinfo(item.id)">
            <img :src="item.url" alt="">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <!-- 加载更多按钮 -->
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
   
    </div>
</template>

<script>
export default {
    data(){
        return {
            page:1,
            goodslists:[]
        }
    },
    methods: {
        getGoodslist(){//获取商品列表
            this.$http.get('/static/goodslist'+this.page+'.json').then((reslut)=>{
                if (reslut.data.state == 1) {//成功
                    this.goodslists=this.goodslists.concat(reslut.data.data)
                    //console.log(this.newlists)
                }         
            })
        },
        getMore(){//加载更多
            this.page++
            this.getGoodslist()
        },
        getoinfo(id){//点击跳转到商品详情页面
            this.$router.push('/home/goods/'+id)
        }

    },
    created() {
        this.getGoodslist()
    }
}
</script>

<style>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        margin: 3px;
        justify-content: space-between;
    }
    .goods-list .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .goods-list .goods-item img{
        width: 100%;
    }
    .goods-list .goods-item .title{
        font-size: 14px;
    }
    .goods-list .goods-item .info{
        background: #eee;
    }
    .goods-list .goods-item .info p{
        margin-bottom: 0;
    }
    .goods-list .goods-item .info .price .now{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .goods-list .goods-item .info .price .old{
        font-size: 12px;
        margin-left: 10px;
        text-decoration: line-through;
    }
    .goods-list .goods-item .info .sell{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }
</style>