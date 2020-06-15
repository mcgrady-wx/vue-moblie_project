// 创建vuex仓库

//导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
//注册 vuex
Vue.use(Vuex)
//创建vuex实例
const store = new Vuex.Store({
    state:{
        count:0
    },
    mutations:{
        getCount(state,num){
            state.count=num
        },
        getCountMore(state,num){
            state.count+=num
        }
    }
})

export default store