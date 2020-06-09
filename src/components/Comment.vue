<template>
    <div class="cmt-container">
        <h4>发布评论</h4>
        <textarea placeholder="请输入评论（最多120个字）" maxlength="120"></textarea>
        <mt-button type="primary" size="large">提交</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in comments" :key="index">
                <p class="cmt-title">
                    第{{index+1}}楼&nbsp;&nbsp;用户：{{item.name}}&nbsp;&nbsp;发表时间：{{item.time}}
                </p>
                <p class="cmt-body">
                    {{item.content ===""?"该用户未评价，默认好评":item.content}}
                </p>
            </div>
 
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            comments:[],
            page:1
        }
    },
    methods: {
        getComment(){
            this.$http.get('/static/newcomment.json').then((reslut)=>{
                 //console.log(reslut.data)
                 //console.log(this.id)，实际中应该是通过传过来的新闻ID+page页码，请求对应的新闻评价列表，首次都是显示第一页评价
                 if (reslut.data.state == 1) {//成功
                    //加载更多数据
                    this.comments=this.comments.concat(reslut.data.data)
                    //console.log(this.newlists)
                } else {//失败
                    Toast("评论加载失败")
                }           
            })
        },
        getMore(){
            this.page++
            //请求下一页内容
            this.getComment()
            //console.log(this.page)
        }
    },

    created() {
        this.getComment()
    },
    props:['id']
}
</script>

<style>
    .cmt-container h4{
        font-size: 14px;
    }
    .cmt-container textarea{
        height: 85px;
        font-size: 13px;
        margin: 0;
    }
    .cmt-container .cmt-list{
        margin: 5px 0;
    }
    .cmt-container .cmt-list .cmt-item{
        font-size: 13px;
    }
    .cmt-container .cmt-list .cmt-item .cmt-title{
        line-height: 30px;
        background-color: #ccc;
    }
    .cmt-container .cmt-list .cmt-item .cmt-body{
        line-height: 35px;
        text-indent: 2em;
    }

</style>