<template>
    <div class="photoinfo">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.time}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图显示区域 -->
        <div class="thumbs">
            <img
                class="previewer-demo-img"
                v-for="(item, index) in list"
                :src="item.src"
                width="100"
                @click="show(index)"
                :key="index"
            />
            <previewer ref="previewer" :list="list" :options="options"> </previewer>
        </div>
        <!-- 描述 -->
        <div class="content">
            {{photoinfo.content}}
        </div>
        <hr>
        <!-- 评论组件 -->
        <photo-comment :id="id"></photo-comment>
    </div>
</template>

<script>
import Comment from "../components/Comment.vue"
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoinfo:{},//图片详情
            list:[],//缩略图
            options: {
                getThumbBoundsFn(index) {
                // find thumbnail element
                let thumbnail = document.querySelectorAll('.previewer-demo-img')[
                    index
                ];
                // get window scroll Y
                let pageYScroll =
                    window.pageYOffset || document.documentElement.scrollTop;
                // optionally get horizontal scroll
                // get position of element relative to viewport
                let rect = thumbnail.getBoundingClientRect();
                // w = width
                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                // Good guide on how to get element coordinates:
                // http://javascript.info/tutorial/coordinates
                }
            }
        }
    },
    methods: {
        getPhotoinfo(){//获取图片详细资料
            this.$http.get('/static/photoinfo'+this.id+'.json').then((reslut)=>{
                if (reslut.data.state == 1) {//成功
                    this.photoinfo=reslut.data.data[0]
                }
            })
        },
        getPhoto(){//获取缩略图
            this.$http.get('/static/photo'+this.id+'.json').then((reslut)=>{
                if (reslut.data.state == 1) {//成功
                    //该组件需要给每个对象添加宽（w）、高(h)属性
                    reslut.data.data.forEach(element => {
                        element.w=600
                        element.h=400
                    });
                    this.list=reslut.data.data
                }
            })
        },
        show(index) {
        // 显示特定index的图片，使用ref
        this.$refs.previewer.show(index);
        }
    },
    created() {
        this.getPhotoinfo()
        this.getPhoto()
    },
    components:{
        'photo-comment':Comment
    }
}
</script>

<style>
    .photoinfo{
        padding: 3px;
    }
    .photoinfo h3{
        font-size: 14px;
        color: blue;
        text-align: center;
        margin: 15px;
    }
    .photoinfo .subtitle{
        margin-bottom: 0;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
    }
    hr{
        margin: 0;
    }
    .photoinfo .content{
        font-size: 13px;
        color: #999;
    }
    .thumbs img{
        margin: 10px;
        height: 80px;
    }
</style>