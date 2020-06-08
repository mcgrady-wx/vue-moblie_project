<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newlists" :key="item.id">
                <router-link :to="`/home/news/${item.id}`">
                    <img class="mui-media-object mui-pull-left" :src="item.img">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.time}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>     

        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            newlists:[]
        }
    },
    methods: {
        getNewList(){
            this.$http.get('/static/newlists.json').then((reslut)=>{
                //console.log(reslut.data)
                if (reslut.data.state == 1) {//成功
                    this.newlists=reslut.data.data
                    //console.log(this.newlists)
                } else {//失败
                    Toast("新闻加载失败")
                }              
            })
        }
    },
    created() {
        this.getNewList()
    },
}
</script>

<style>
.mui-media-body h1{
    font-size: 16px;
}
.mui-media-body .mui-ellipsis{
    display: flex;
    justify-content: space-between;
}
.mui-media-body .mui-ellipsis span{
    font-size: 13px;
    color: blue;
}
</style>