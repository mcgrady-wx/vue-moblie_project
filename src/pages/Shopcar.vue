<template>
    <!-- 使用mui设计页面 -->
    <div class="shopcar">        
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner" v-for="(item, index) in lists" :key="item.id">
                    <!-- mint-ui的该组件有一个自带的change方法监测数据的变化 -->
                    <mt-switch v-model="$store.getters.getSelected[item.id]" @change="changeSelected(item.id,$store.getters.getSelected[item.id])"></mt-switch>
                    <img :src="item.url" alt="">
                    <div class="info">
                        <h4 class="title">{{item.title}}</h4>
                        <p>
                            <span class="price">￥{{item.price}}</span>
                            <!-- 把商品的购买数量传递给子组件，设置初始购买数量 同时传递id过去用于查找商品改变商品数量-->
                            <ShopcarNumbox :count="item.count" :id="item.id"></ShopcarNumbox>
                            <a href="#" @click.prevent="delGoods(item.id,index)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品<span>0</span>件，总价：<span>￥0</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

        <p>
            {{$store.getters.getSelected}}
        </p>
    </div>
</template>

<script>
import ShopcarNumbox from '../components/Shopcar_Numbox.vue'
export default {
    data(){
        return {
            lists:[]//购物车商品数据
        }
    },
    methods: {
        getshopcar(){//获取到购物车的商品信息
            this.lists=JSON.parse(localStorage.getItem("car")) || []
        },
        delGoods(id,index){//删除商品，需要同时删除仓库中的数据和私有的lists里面的数据，如果只删除仓库中的数据页面不会发生变化
            //删除私有的lists中的数据
            this.lists.splice(index,1)

            //删除仓库中的数据
            this.$store.commit('delGoods',id)

        },
        changeSelected(id,val){//改变Selected的值，保存到vuex中，需要传递两个值 一个商品ID 一个Selected的值
            this.$store.commit('changeGoodsSelected',{id:id,selected:val})

        }
    },
    created() {
        this.getshopcar()
    },
    components:{
        ShopcarNumbox
    }
}
</script>

<style>
    .shopcar{
        background-color: #eee;
        overflow: hidden;
    }
    .shopcar .mui-card-content-inner{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .shopcar .mui-card-content-inner img{
        width: 60px;
        height: 60px;
    }
    .shopcar .mui-card-content-inner .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .shopcar .mui-card-content-inner .info p{
        display: flex;
        justify-content: space-between;
    }
    .shopcar .mui-card-content-inner .info .title{
        font-size: 13px;
    }
    .shopcar .mui-card-content-inner .info p .price{
        color: red;
        font-weight: bold
    }
    .shopcar .mui-card-content-inner .left p span{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
</style>