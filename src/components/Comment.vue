<template>
    <div class="cmt-container">
        <h4>发布评论</h4>
        <textarea placeholder="请输入评论（最多120个字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">提交</mt-button>
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
            page:1,
            msg:''
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
        },
        postComment(){
            //实际是发起post请求，把评论内容发送后台保存，后台返回保存结果，通过返回结果，手动设计数据，直接插入到comments数据的最开头，让页面显示
            //而不是通过重新调用getComment()来获取最新数据显示，存在的BUG就是，如果当page不为1的时候请求过来的数据是page当前值的那页数据
            //内容验证
            //console.log(this.msg.trim().length)
            if (this.msg.trim().length === 0) {
              return Toast("内容不能为空")
            }
            //不为空发起post请求，如果返回成功显示内容
            //this.$http.post("api路径"，{content:内容}).then(成功(),失败())
            //以下代码应该放在请求成功的函数体内部
            Toast("发表成功")
            var msgdata={
                "name":"匿名用户",
                "time":"2020-02-02 02:02:02",
                "content":this.msg
            }
            this.comments.unshift(msgdata)
            this.msg=""
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