<template>
    <div class="desc">
        <h3>{{info.title}}</h3>
        <hr>
        <!-- 使用缩略图模拟图文介绍 -->
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

    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            info:{},
            list:[],
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
        getGoods(){//获取商品图片
            this.$http.get('/static/goods'+this.id+'.json').then(
                (reslut)=>{//请求成功的函数
                    if (reslut.data.state == 1) {//成功
                        //该组件需要给每个对象添加宽（w）、高(h)属性
                        reslut.data.data.forEach(element => {
                            element.src=element.img
                            element.w=600
                            element.h=400
                        });
                        this.list=reslut.data.data
                    }    
                },
                ()=>{//请求失败的函数
                    Toast("数据加载失败")
                }
            )          
        },
        getGoodsinfo(){//获取商品详细资料
            this.$http.get('/static/goodsinfo'+this.id+'.json').then((reslut)=>{//请求成功的函数
                    if (reslut.data.state == 1) {//成功
                        this.info=reslut.data.data[0]
                    }    
                })          
        },
        show(index) {
            // 显示特定index的图片，使用ref
            this.$refs.previewer.show(index);
        }
    },
    created() {
        this.getGoods()
        this.getGoodsinfo()
    },
}
</script>

<style>
    .desc{
        padding: 3px;
    }
    .desc h3{
        font-size: 14px;
        color:blue;
        margin: 15px 0;
        text-align: center;
    }
</style>