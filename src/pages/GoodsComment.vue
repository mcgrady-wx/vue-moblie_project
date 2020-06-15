<template>
    <div>
        <goods-comment :id="$route.params.id"></goods-comment>
    </div>
</template>

<script>
import Comment from '../components/Comment.vue'
export default {
    components:{
        'goods-comment':Comment
    }
}
</script>

<style>

</style>