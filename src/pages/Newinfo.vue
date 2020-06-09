<template>
    <div style="margin: 0 5px;">
        <h3 class="title">新闻详情页面</h3>
        <hr>
        <div class="conent">
            <p>请求的新闻ID是：{{id}}</p>
        </div>
        <hr>
        <new-commemt :id="id"></new-commemt>
        
    </div>
</template>

<script>
import Comment from '../components/Comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id
        }
    },
    components:{
        'new-commemt':Comment
    }
}
    
</script>

<style scoped>
.title{
    color: red;
    font-size: 15px;
    text-align: center;
    line-height: 15px;
}
.conent{
    height: 400px;
}
.conent p{
    font-size: 13px;
    text-align: center;
}

</style>