<template>
    <div>
        新闻详情页面-----请求的新闻ID是：{{id}}
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id
        }
    }
}
    
</script>

<style>

</style>