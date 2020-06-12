<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="https://img20.360buyimg.com/babel/s320x320_jfs/t1/55230/40/3512/407689/5d12df1eE1d24f849/480bbe8cb024267b.jpg!cc_320x320.webp" alt="">
            <h3 class="title">AMD 锐龙9 3900X 处理器 (r9)7nm 12核24线程</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥3599</span>
                    <span class="old">￥3799</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余40件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="https://img20.360buyimg.com/babel/s320x320_jfs/t1/55230/40/3512/407689/5d12df1eE1d24f849/480bbe8cb024267b.jpg!cc_320x320.webp" alt="">
            <h3 class="title">AMD 锐龙9 3900X 处理器 (r9)7nm 12核24线程 (r9)7nm 12核24线程</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥3599</span>
                    <span class="old">￥3799</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余40件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="https://img20.360buyimg.com/babel/s320x320_jfs/t1/55230/40/3512/407689/5d12df1eE1d24f849/480bbe8cb024267b.jpg!cc_320x320.webp" alt="">
            <h3 class="title">AMD 锐龙9 3900X 处理器 (r9)7nm 12核24线程</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥3599</span>
                    <span class="old">￥3799</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余40件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
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