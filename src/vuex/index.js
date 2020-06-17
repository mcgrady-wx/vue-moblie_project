// 创建vuex仓库

//导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
//注册 vuex
Vue.use(Vuex)

//当进入页面获取到本地存储的购物车数据，如果没有显示空数组
var car=JSON.parse(localStorage.getItem('car')) || []

//创建vuex实例
const store = new Vuex.Store({
    state:{
       car:car//保存购买信息的对象，包括count（数量） id（商品ID） title （商品标题）price（商品价格）selected（是否购买，默认true）
    },
    mutations:{
        getcar(state,carobj){//添加商品到购物车
            //要通过id来判断添加的商品信息是否是同一个商品，如果是同一个商品只增加数量

            var flag=false//判断是否是添加的同一个商品
            state.car.forEach(item=>{
                if (item.id==carobj.id) {
                    item.count+=parseInt(carobj.count)
                    flag=true
                }
            })
            
            if (!flag) {//表示没有相同id的商品，直接push进去
                state.car.push(carobj)
            }

            //当更新后，把car的数据保存到本地保存起来
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        changecar(state,obj){//更改购物商品的数量
            state.car.forEach(item=>{
                if (item.id==obj.id) {
                    item.count=parseInt(obj.count)
                }
            })
            //更新后，把数据保存到本地
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        delGoods(state,id){//删除商品
            state.car.some((item,index)=>{
                if (item.id==id) {
                    state.car.splice(index,1)
                }
                return true//找到id删除后，直接return true 结束遍历
            })

            //更新后，把数据保存到本地
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        getnum(state){//获得购买总数量
            var num=0//定义购买总数量，默认0
            state.car.forEach(item=>{
                num+=item.count
            })
            return num
        }
    }
})

export default store